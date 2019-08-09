import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:4200',
        'https://hassankn.github.io/jokepedia',
      ],
    },
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
