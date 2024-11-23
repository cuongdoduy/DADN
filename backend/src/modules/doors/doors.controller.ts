import { Body, Controller, Get, Post } from '@nestjs/common'
import { DoorsService } from './doors.service'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateDoorDTO } from './dto/create-door.dto'

@ApiTags('DOORS')
@Controller('api/doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @ApiOperation({
    summary: 'Get all doors',
    description: 'Get all doors.',
  })
  @Get()
  async getAllDoors() {
    return this.doorsService.findAll()
  }

  @ApiOperation({
    summary: 'Create door',
    description: 'Create door.',
  })
  @ApiBody({ type: CreateDoorDTO })
  @Post()
  async createDoor(@Body() door: CreateDoorDTO) {
    return this.doorsService.create(door)
  }
}
