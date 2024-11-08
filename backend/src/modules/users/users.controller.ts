import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all orders.',
  })
  @Get()
  async getAllUsers() {
    return this.usersService.findAll()
  }

  // @ApiOperation({
  //   summary: 'Get user by ID',
  //   description: 'Get user by ID.',
  // })
  // @Get(':id')
  // async getUserById({ id }) {
  //   return this.usersService.findOneByCondition({ id: id })
  // }

  @ApiOperation({
    summary: 'Create user',
    description: 'Create user.',
  })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return this.usersService.create(user)
  }
}
