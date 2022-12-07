import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   allowedHeaders: ['content-type', 'application/json; charset=utf-8'],
  //   origin: 'http://localhost:3000/',
  //   credentials: true,
  // });
  app.enableCors()
  await app.listen(4000, () => {
    console.info('\nListening on port: 4000');
  });
}
bootstrap();
