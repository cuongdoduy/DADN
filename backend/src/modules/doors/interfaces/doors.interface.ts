import { Door } from 'src/models/door.entity'
import { BaseAbstractRepostitory } from 'src/repositories/base/base.abstract.repository'

export interface DoorsRepositoryInterface
  extends BaseAbstractRepostitory<Door> {}
