import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  variant_id: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  desc: string;
}
