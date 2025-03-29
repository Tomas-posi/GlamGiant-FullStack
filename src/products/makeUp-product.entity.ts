// makeup-product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductTest } from '../ProductTests/product-test.entity';

@Entity()
export class MakeupProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column()
  location: string;

  @Column()
  durability: string;

  @OneToMany(() => ProductTest, (productTest) => productTest.product)
  tests: ProductTest[];
}
