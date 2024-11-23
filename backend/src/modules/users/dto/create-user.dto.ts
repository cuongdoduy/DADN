import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  username: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  houseId: number
}