import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherSeeder {
  constructor(@InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>) {}

  async seed(): Promise<void> {
    try {
      // Vérifiez si des enseignants existent déjà dans la base de données
      const existingTeachers = await this.teacherModel.countDocuments();
      if (existingTeachers > 0) {
        console.log('Les enseignants existent déjà dans la base de données.');
        return;
      }

      // Créez un mot de passe haché
      const hashedPassword = await bcrypt.hash('password123', 10);

      // Liste des enseignants à ajouter
      const teachers = [
        {
          firstname: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: hashedPassword,
          profilePicture: '../../../assets/default-profile-picture.jpg',
          matiere: 'Mathematics',
          isPaid: true,
        },
        {
          firstname: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: hashedPassword,
          profilePicture: '../../../assets/default-profile-picture.jpg',
          matiere: 'Physics',
          isPaid: true,
        },
      ];

      // Insérez les enseignants dans la base de données
      await this.teacherModel.insertMany(teachers);
      console.log('Enseignants ajoutés avec succès à la base de données.');
    } catch (error) {
      console.error('Erreur lors de l’initialisation des enseignants :', error);
    }
  }
}
