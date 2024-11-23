import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { House } from './house.entity'

@Entity('Relay')
export class Relay {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  status: string

  @Column({ type: 'timestamp' })
  updated_time: Date

  @ManyToOne(() => House, (house) => house.relays, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'house_id' })
  house: House

  @Column({ type: 'int', nullable: true, name: 'house_id' })
  houseId: number
}
