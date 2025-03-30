import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDate()
  orderDate?: Date;

  @IsOptional()
  @IsNumber({}, { each: true })
  productIds?: number[];
}
