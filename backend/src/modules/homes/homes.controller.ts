import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { HomesService } from './homes.service'
import { CreateHouseDTO } from './dto/create-house.dto'

@ApiTags('HOUSES')
@Controller('api/houses')
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

  @ApiOperation({
    summary: 'Get all houses',
    description: 'Get all houses.',
  })
  async getAllHouses() {
    return this.homesService.findAll()
  }

  @ApiOperation({
    summary: 'Get house by id',
    description: 'Get house by id.',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async getHouseById(@Param('id') id: number) {
    return this.homesService.findOne(id)
  }

  @ApiOperation({
    summary: 'Create house',
    description: 'Create house.',
  })
  @ApiBody({ type: CreateHouseDTO })
  @Post()
  async createHouse(@Body() house: CreateHouseDTO) {
    return await this.homesService.create(house)
  }
}
