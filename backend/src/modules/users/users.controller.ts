import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
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

  @ApiOperation({
    summary: 'Create user',
    description: 'Create user.',
  })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    return this.usersService.create(user)
  }

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get user by id.',
  })
  @Get(':id')
  async getUserById(@Body() id: number) {
    return this.usersService.findOne(id)
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Update user.',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: CreateUserDTO })
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: CreateUserDTO) {
    return await this.usersService.update({
      id,
      ...user,
    })
  }
}
