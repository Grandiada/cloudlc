# ---------- BUILD STAGE ----------
FROM node:24-alpine AS builder
WORKDIR /app

# Базовые файлы монорепо
COPY package*.json nest-cli.json tsconfig*.json ./

# Весь код (apps + entities)
COPY apps ./apps
COPY entities ./entities

RUN npm ci

# Сборка конкретного сервиса
RUN npx nest build trip-service

# ---------- RUNTIME STAGE ----------
FROM node:24-alpine
WORKDIR /app

# Устанавливаем только production-зависимости
COPY package*.json ./
RUN npm ci --omit=dev

# Забираем готовый билд
COPY --from=builder /app/dist ./dist

# Запуск сервиса
CMD ["node", "dist/apps/trip-service/main.js"]
    
EXPOSE 3001