import { House } from 'src/models/house.entity'
import { BaseAbstractRepostitory } from 'src/repositories/base/base.abstract.repository'

export interface HousesRepositoryInterface
  extends BaseAbstractRepostitory<House> {}
