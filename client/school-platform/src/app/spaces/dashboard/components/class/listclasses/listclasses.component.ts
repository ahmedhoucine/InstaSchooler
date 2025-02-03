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
  courses: any[] = [];

  // Temporary fix - replace with actual teacher ID from auth
  tempTeacherId = 'TEMPORARY_TEACHER_ID';

  constructor(
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.classService.getAllClasses().subscribe(
      (courses) => this.courses = courses,
      (error) => console.error('Error fetching courses', error)
    );
  }

  // Temporary view implementation
  viewClass(id: string): void {
    const course = this.courses.find(c => c._id === id);
    this.router.navigate(['/dashboard/course/view'], {
      state: { course } // Pass data via navigation state
    });
  }

  // Updated delete method
  deleteClass(id: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.classService.deleteClass(id).subscribe({
        next: () => this.getCourses(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  // Add new course with temporary teacher ID
  addNewCourse(): void {
    const newCourse = {
      niveau: 'Sample Level',
      description: 'Sample Description',
      duration: 60,
      teacher: this.tempTeacherId
    };

    this.classService.createClass(newCourse).subscribe({
      next: () => this.getCourses(),
      error: (err) => console.error('Create failed', err)
    });
  }
}
