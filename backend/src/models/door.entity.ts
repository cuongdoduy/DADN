import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { House } from './house.entity'

@Entity('Door')
export class Door {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20 })
  status: string

  @Column({ type: 'varchar', length: 20 })
  password: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_time: Date

  @ManyToOne(() => House, (house) => house.doors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'house_id' })
  house: House

  @Column({ type: 'int', nullable: true, name: 'house_id' })
  houseId: number
}
