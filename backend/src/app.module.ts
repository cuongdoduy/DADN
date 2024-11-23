import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import ormconfig from './database/ormconfig'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './modules/users/users.module'
import { HomesModule } from './modules/homes/homes.module'
import { DoorsModule } from './modules/doors/doors.module'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    HomesModule,
    DoorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
