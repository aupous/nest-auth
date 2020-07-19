import { IsOptional, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
