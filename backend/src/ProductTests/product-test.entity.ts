import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { MakeupProduct } from '../products/makeUp-product.entity';

@Entity()
export class ProductTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tests, { eager: true })
  tester: User;

  @ManyToOne(() => MakeupProduct, (product) => product.tests, { eager: true })
  product: MakeupProduct;

  @Column('text')
  reaction: string;

  @Column('int')
  rating: number;

  @Column('boolean')
  survivalStatus: boolean;
}