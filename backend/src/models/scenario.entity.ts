import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { House } from './house.entity'

@Entity('Scenario')
export class Scenario {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  house_id: number

  @Column({ type: 'json' })
  value: Record<string, any>

  @Column({ type: 'timestamp' })
  created_at: Date

  @ManyToOne(() => House, (house) => house.scenarios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'house_id' })
  house: House

  @Column({ name: 'house_id', type: 'int', nullable: true })
  houseId: number
}
