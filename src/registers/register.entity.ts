import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Service)
  service: Service;

  @Column()
  date: Date;

  @Column({ default: 'pendiente' })
  status: string;
}
