import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  desc: string;
}
