import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/spaces/dashboard/services/class.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-list-classes',
  templateUrl: './listclasses.component.html',
  styleUrls: ['./listclasses.component.scss']
})
export class ListClassesComponent implements OnInit {
  classes: any[] = [];

  constructor(private teacherService: TeacherService,private classService: ClassService, private router: Router) {}

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(): void {
    this.classService.getAllClasses().subscribe(
      (classes) => {
        const teacherRequests = classes.map((classItem: any) =>
          this.teacherService.getTeacherById(classItem.teacher) // Fetch teacher by ID
        );

        forkJoin(teacherRequests).subscribe(
          (teachers) => {
            this.classes = classes.map((classItem, index) => ({
              ...classItem,
              teacher: teachers[index] // Replace ID with teacher object
            }));
          },
          (error) => {
            console.error('Error fetching teachers', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching classes', error);
      }
    );
  }

  // Navigate to view class details page
  viewClass(id: string): void {
    this.router.navigate([`/dashboard/class/${id}`]); // Update with the appropriate route
  }

  // Delete class
  deleteClass(id: string): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.deleteClass(id).subscribe(() => {
        this.getClasses(); // Refresh class list after deletion
      });
    }
  }
  goToAddClassPage(): void {
    this.router.navigate(['/dashboard/class/addclass']);
  }
}
