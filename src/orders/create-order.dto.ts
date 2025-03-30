import { IsUUID, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { PaymentStatus } from './order.entity';

export class CreateOrderDto {
  @IsUUID()
  client_id: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("all", { each: true })
  products: string[];

  @IsEnum(PaymentStatus)
  payment_status: PaymentStatus;
}
