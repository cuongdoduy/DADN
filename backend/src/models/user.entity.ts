import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { House } from './house.entity'

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  username: string

  @Column({ type: 'varchar', length: 50 })
  password: string

  @ManyToOne(() => House, (house) => house.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'house_id' })
  house: House

  @Column({ type: 'int', nullable: true, name: 'house_id' })
  houseId: number
}
