import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true
  });
  app.enableCors();
  await app.listen(4000, () => {
    console.info('\nListening on port: 4000');
  });
}
bootstrap();
