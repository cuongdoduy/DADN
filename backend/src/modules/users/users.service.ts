import { Inject, Injectable } from '@nestjs/common'
import { User } from 'src/models/user.entity'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { UsersRepositoryInterface } from './interfaces/users.interface'
import { CreateUserDTO } from './dto/create-user.dto'
import { DeepPartial } from 'typeorm'

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly users_repository: UsersRepositoryInterface,
  ) {
    super(users_repository)
  }

  async createNewUser(user: CreateUserDTO): Promise<User> {
    return await this.users_repository.save(user)
  }
}
