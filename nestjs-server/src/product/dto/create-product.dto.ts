import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  stockQuantity: number;
}
