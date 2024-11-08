import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  first_name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  last_name: string

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  user_name: number

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  email: string
}