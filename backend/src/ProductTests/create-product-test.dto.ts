import { IsUUID, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateProductTestDto {
  @IsUUID()
  testerId: string;

  @IsUUID()
  productId: string;

  @IsString()
  reaction: string;

  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsBoolean()
  survivalStatus: boolean;
}
