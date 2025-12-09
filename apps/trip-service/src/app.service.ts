import { ServiceBusClient, ServiceBusReceiver } from '@azure/service-bus';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnModuleDestroy {
  private cancellationReciever: ServiceBusReceiver;
  private client: ServiceBusClient;

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const connectionString = this.configService.get<string>(
      'AZURE_SERVICE_BUS_CONNECTION',
    )!;

    const queueName = this.configService.get<string>('AZURE_QUEUE_NAME')!;

    this.client = new ServiceBusClient(connectionString);
    this.cancellationReciever = this.client.createReceiver(queueName);

    this.cancellationReciever.subscribe({
      processMessage: async (message) => {
        await this.processMessage(message.body);
      },
      processError: (err) => {
        console.error(err);
        return Promise.resolve(undefined);
      },
    });
  }

  async getUsersWithTrips(): Promise<string> {
    const users = await this.userRepo.find({
      relations: ['trips', 'trips.bookings', 'trips.bookings.flight'],
    });

    return JSON.stringify(users);
  }

  async processMessage(message: string): Promise<void> {
    console.log('--------------------------------');
    console.log('Server time: ', new Date().toISOString());
    console.log('Recieved message from cancellation queue: ', message);
    console.log('--------------------------------');
    return Promise.resolve(undefined);
  }

  onModuleDestroy(): void {
    void this.cancellationReciever.close();
    void this.client.close();
  }
}
