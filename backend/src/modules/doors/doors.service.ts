import { Inject, Injectable } from '@nestjs/common'
import { Door } from 'src/models/door.entity'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { DoorsRepositoryInterface } from './interfaces/doors.interface'

@Injectable()
export class DoorsService extends BaseServiceAbstract<Door> {
  constructor(
    @Inject('DoorsRepositoryInterface')
    private readonly doors_repository: DoorsRepositoryInterface,
  ) {
    super(doors_repository)
  }
}
