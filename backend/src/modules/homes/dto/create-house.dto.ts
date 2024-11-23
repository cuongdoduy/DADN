import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateHouseDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  name: string
}