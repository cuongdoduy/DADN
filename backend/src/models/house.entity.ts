import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Light } from './light.entity';
import { Door } from './door.entity';
import { Fan } from './fan.entity';
import { Relay } from './relay.entity';
import { Scenario } from './scenario.entity';

@Entity('House')
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => User, (user) => user.house)
  users: User[];

  @OneToMany(() => Light, (light) => light.house)
  lights: Light[];

  @OneToMany(() => Door, (door) => door.house)
  doors: Door[];

  @OneToMany(() => Fan, (fan) => fan.house)
  fans: Fan[];

  @OneToMany(() => Relay, (relay) => relay.house)
  relays: Relay[];

  @OneToMany(() => Scenario, (scenario) => scenario.house)
  scenarios: Scenario[];
}
