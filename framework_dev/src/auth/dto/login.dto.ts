import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
   password: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
   password?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Confirm Password must be at least 6 characters long' })
  readonly confirmPassword?: string;

  @IsOptional()
  @IsString()
  readonly currentPassword?: string;

  @IsOptional()
  @IsString()
  readonly profilePicture?: string;  // The profile picture URL or base64 encoded string
}
