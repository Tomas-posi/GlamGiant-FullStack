import { IsString, IsNumber, Min, Max, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ProductCategory } from './makeUp-product.entity'; // Import the enum

export class UpdateMakeupProductDto {
  @IsOptional()
  @IsUUID()
  id?: string; // UUID support

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(ProductCategory, { message: 'Category must be a valid MakeupCategory' })
  category?: ProductCategory; // Now uses the Enum

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Durability score must be at least 1' })
  @Max(10, { message: 'Durability score cannot exceed 10' })
  durability_score?: number; // Updated field with integer validation

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }) // Ensures the price has at most 2 decimal places
  @Min(0, { message: 'Price must be a positive value' })
  price?: number;
}

