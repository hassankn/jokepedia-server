import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
  ],
  controllers: [
    AppController,
    UserController,
  ],
  providers: [
    AppService,
    UserService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
