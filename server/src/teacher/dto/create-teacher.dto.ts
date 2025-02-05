import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEnum,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { Matiere } from '../matiere.enum';
import * as bcrypt from 'bcrypt';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Matiere)
  matiere: Matiere;

  @IsBoolean()
  isPaid: boolean;

  @IsNotEmpty()
  @Matches(/^([2459])[0-9]{7}$/, {
    message:
        'Numéro de téléphone invalide. Le numéro doit commencer par 2, 4, 5, ou 9 et avoir 8 chiffres.',
  })
  phone: string;

  // (Optional) If you ever need a generated password method
  async generateHashedPassword(): Promise<string> {
    const password = `${this.firstname}@${this.lastName.toUpperCase()}`;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
