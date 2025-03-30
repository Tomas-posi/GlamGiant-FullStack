import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Check } from 'typeorm';
import { ProductTest } from '../ProductTests/product-test.entity';

export enum ProductCategory {
  LIPSTICK = 'Lipstick',
  FOUNDATION = 'Foundation',
  EYESHADOW = 'Eyeshadow',
  MASCARA = 'Mascara',
  BLUSH = 'Blush',
  HIGHLIGHTER = 'Highlighter',
}

@Entity()
@Check(`"durability_score" BETWEEN 1 AND 10`) // Enforces the range at the database level
export class MakeupProduct {
  @PrimaryGeneratedColumn('uuid') // Generates a UUID automatically
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column()
  location: string;

  @Column({ type: 'int' })
  durability_score: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // ✅ Added price as a decimal
  price: number;

  @OneToMany(() => ProductTest, (productTest) => productTest.product)
  tests: ProductTest[];
}
