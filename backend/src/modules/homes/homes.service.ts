import { Inject, Injectable } from '@nestjs/common'
import { House } from 'src/models/house.entity'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { HousesRepositoryInterface } from './interfaces/homes.interface'

@Injectable()
export class HomesService extends BaseServiceAbstract<House> {
  constructor(
    @Inject('HousesRepositoryInterface')
    private readonly houses_repository: HousesRepositoryInterface,
  ) {
    super(houses_repository)
  }
}
