import { IsString, IsNumber, Min, Max, IsNotEmpty, IsEnum } from 'class-validator';
import { ProductCategory } from './makeUp-product.entity';

export class CreateMakeupProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductCategory, { message: 'Category must be a valid product category' })
  category: ProductCategory;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Durability score must be at least 1' })
  @Max(10, { message: 'Durability score cannot be greater than 10' })
  durability_score: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }) // ✅ Ensures max two decimal places
  @Min(0, { message: 'Price cannot be negative' }) // ✅ Ensures price is non-negative
  price: number;
}

