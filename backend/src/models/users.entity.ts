import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 50 })
  first_name: string

  @Column({ length: 50 })
  last_name: string

  @Column({ length: 50, unique: true })
  user_name: string

  @Column({ length: 200, unique: true })
  email: string

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
