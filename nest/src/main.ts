import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './comoon/interceptors/logger.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
    console.log(`🚀 Server running on http://localhost:3000`);


app.useGlobalInterceptors(new LoggerInterceptor())
await app.listen(process.env.PORT || 5000,()=>{
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
} )
;

}


bootstrap();
