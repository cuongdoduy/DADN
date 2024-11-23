import { InjectRepository } from '@nestjs/typeorm'
import { BaseAbstractRepostitory } from './base/base.abstract.repository'
import { User } from 'src/models/user.entity'
import { Repository } from 'typeorm'
import { UsersRepositoryInterface } from 'src/modules/users/interfaces/users.interface'

export class UsersRepository
  extends BaseAbstractRepostitory<User>
  implements UsersRepositoryInterface
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository)
  }
}
