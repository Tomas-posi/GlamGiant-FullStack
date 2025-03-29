import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTest } from '../ProductTests/product-test.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Client' })
  role: string;

  @Column({ default: false })
  testSubject: boolean;

  @Column({ nullable: true })
  allergicReactions: string;

  @OneToMany(() => ProductTest, (productTest) => productTest.tester)
  tests: ProductTest[];
}
