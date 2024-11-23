import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { House } from './house.entity'

@Entity('Fan')
export class Fan {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  speed: string

  @Column({ type: 'timestamp' })
  updated_time: Date

  @ManyToOne(() => House, (house) => house.fans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'house_id' })
  house: House

  @Column({ type: 'int', nullable: true, name: 'house_id' })
  houseId: number
}
