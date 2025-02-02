import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/spaces/dashboard/services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-classes',
  templateUrl: './listclasses.component.html',
  styleUrls: ['./listclasses.component.scss']
})
export class ListClassesComponent implements OnInit {
  courses: any[] = [];

  constructor(
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.classService.getAllClasses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }

  viewClass(id: string): void {
    this.router.navigate([`/dashboard/class/${id}`]);
  }

  deleteClass(id: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.classService.deleteClass(id).subscribe(() => {
        this.getCourses();
      });
    }
  }
}
