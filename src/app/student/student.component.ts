import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  niveau = 1; // Niveau sélectionné
  students: any[] = []; // Liste des étudiants

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents(); // Charger les étudiants lors de l'initialisation
    this.students
  }

  // Récupérer les étudiants par niveau
  fetchStudents(): void {
    this.studentService.getStudentsByNiveau(this.niveau).subscribe(
      (data) => {
        this.students = data;
        console.log(data)
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants :', error);
      }
    );
  }

  // Envoyer les mises à jour des statuts des étudiants
  sendUpdates(): void {
    const updates = this.students.map((student) => ({
      id: student._id,
      status: student.status,
    }));

    this.studentService.updateStudentsStatus(updates).subscribe(
      () => {
        alert('Statuts des étudiants mis à jour avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des statuts :', error);
        alert('Erreur lors de la mise à jour des statuts.');
      }
    );
  }
}
