import { Users } from 'src/models/users.entity'
import { BaseAbstractRepostitory } from 'src/repositories/base/base.abstract.repository'

export interface UsersRepositoryInterface
  extends BaseAbstractRepostitory<Users> {}
