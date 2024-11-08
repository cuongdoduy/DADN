import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersRepository } from 'src/repositories/users.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/models/users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
