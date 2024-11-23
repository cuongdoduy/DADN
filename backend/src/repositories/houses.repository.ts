import { House } from 'src/models/house.entity'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { HousesRepositoryInterface } from 'src/modules/homes/interfaces/homes.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class HousesRepository
  extends BaseAbstractRepostitory<House>
  implements HousesRepositoryInterface
{
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
  ) {
    super(houseRepository)
  }
}
