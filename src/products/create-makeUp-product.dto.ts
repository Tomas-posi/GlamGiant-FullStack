import { IsString, IsNumber, Min, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMakeupProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsDateString() 
  durability: string;
}
