import { Door } from 'src/models/door.entity'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { DoorsRepositoryInterface } from 'src/modules/doors/interfaces/doors.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class DoorsRepository
  extends BaseAbstractRepostitory<Door>
  implements DoorsRepositoryInterface
{
  constructor(
    @InjectRepository(Door)
    private readonly doorRepository: Repository<Door>,
  ) {
    super(doorRepository)
  }
}
