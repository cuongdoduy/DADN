import { Module } from '@nestjs/common'
import { DoorsService } from './doors.service'
import { DoorsController } from './doors.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Door } from 'src/models/door.entity'
import { DoorsRepository } from 'src/repositories/doors.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Door])],
  providers: [
    DoorsService,
    {
      provide: 'DoorsRepositoryInterface',
      useClass: DoorsRepository,
    },
  ],
  controllers: [DoorsController],
  exports: [DoorsService],
})
export class DoorsModule {}
