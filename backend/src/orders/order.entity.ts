import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PaymentStatus {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;  // antes era UUID

  @Column()
  client_id: number; // antes era UUID

  @Column('simple-array') // almacena IDs de productos como coma-separados
  products: number[];  // antes string[]

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  payment_status: PaymentStatus;
}


