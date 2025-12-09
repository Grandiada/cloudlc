import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CancellationServiceService implements OnModuleDestroy {
  private sender: ServiceBusSender;
  private client: ServiceBusClient;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const connectionString = this.configService.get<string>(
      'AZURE_SERVICE_BUS_CONNECTION',
    )!;

    const queueName = this.configService.get<string>('AZURE_QUEUE_NAME')!;

    this.client = new ServiceBusClient(connectionString);
    this.sender = this.client.createSender(queueName);
  }

  async sendMessage(message: string): Promise<void> {
    await this.sender.sendMessages([{ body: message }]);
  }

  onModuleDestroy(): void {
    void this.sender.close();
    void this.client.close();
  }
}
