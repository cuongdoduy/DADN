import { User } from 'src/models/user.entity'
import { BaseAbstractRepostitory } from 'src/repositories/base/base.abstract.repository'

export interface UsersRepositoryInterface
  extends BaseAbstractRepostitory<User> {}
