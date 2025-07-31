import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // or specify your frontend URL, e.g., 'http://localhost:5173'
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on:`,
    process.env.PORT,
    process.env.MONGO_URI,
  );
}
bootstrap();
