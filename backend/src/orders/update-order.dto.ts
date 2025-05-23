import { IsOptional, IsEnum, IsArray, IsNumber, IsInt } from 'class-validator';
import { PaymentStatus } from './order.entity';

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  client_id?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  products?: number[];

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status?: PaymentStatus;
}

