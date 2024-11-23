import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateDoorDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  status: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  houseId: number
}