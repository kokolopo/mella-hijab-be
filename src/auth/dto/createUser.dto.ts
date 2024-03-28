import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  bod: Date;

  @IsNotEmpty()
  pob: string;

  @IsNotEmpty()
  domicile: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}
