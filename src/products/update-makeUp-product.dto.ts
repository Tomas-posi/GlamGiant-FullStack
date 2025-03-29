import { IsString, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

export class UpdateMakeupProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString() 
  durability?: string;
}
