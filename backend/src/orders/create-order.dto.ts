import { IsInt, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { PaymentStatus } from './order.entity';

export class CreateOrderDto {
  @IsInt()
  client_id: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  products: number[];

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}

