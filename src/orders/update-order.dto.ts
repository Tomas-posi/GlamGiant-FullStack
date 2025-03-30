import { IsUUID, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';
import { PaymentStatus } from './order.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  client_id?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  products?: string[];

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status?: PaymentStatus;
}
