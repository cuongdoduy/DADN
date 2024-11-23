import { Module } from '@nestjs/common'
import { HomesService } from './homes.service'
import { HomesController } from './homes.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { House } from 'src/models/house.entity'
import { HousesRepository } from 'src/repositories/houses.repository'

@Module({
  imports: [TypeOrmModule.forFeature([House])],
  providers: [
    HomesService,
    {
      provide: 'HousesRepositoryInterface',
      useClass: HousesRepository,
    },
  ],
  controllers: [HomesController],
  exports: [HomesService],
})
export class HomesModule {}
