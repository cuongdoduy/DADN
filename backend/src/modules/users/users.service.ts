import { Inject, Injectable } from '@nestjs/common'
import { Users } from 'src/models/users.entity'
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service'
import { UsersRepositoryInterface } from './interfaces/users.interface'
import { CreateUserDTO } from './dto/create-user.dto'
import { DeepPartial } from 'typeorm'

@Injectable()
export class UsersService extends BaseServiceAbstract<Users> {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly users_repository: UsersRepositoryInterface,
  ) {
    super(users_repository)
  }

  async createNewUser(user: DeepPartial<Users>): Promise<Users> {
    return await this.users_repository.create(user)
  }
}
