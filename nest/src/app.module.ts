import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { log } from 'console';
import { loggerMiddleWare } from './comoon/middleware/logger.middleware';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest',{
      onConnectionCreate: (connection) => {
        connection.on('connected', () => log('MongoDB connected'));
        connection.on('open', () => log('MongoDB open'));
        connection.on('disconnected', () => log('MongoDB disconnected'));
        connection.on('reconnected', () => log('MongoDB reconnected'));

      }
    })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer) {
    consumer
    .apply(loggerMiddleWare)
    .exclude(
      {path:' /auth/login',method:RequestMethod.POST}).forRoutes('*');
      
  }
}
