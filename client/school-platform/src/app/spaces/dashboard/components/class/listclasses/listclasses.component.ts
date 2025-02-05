import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/spaces/dashboard/services/class.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TeacherService } from 'src/app/spaces/dashboard/services/teacher.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    private router: Router,
    private teacherService: TeacherService,
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  // getCourses(): void {
  //   this.classService.getAllClasses().subscribe(
  //     (courses) => {this.courses = courses;
  //     console.log('API Response:', courses);}, // Add this line
  //     (error) => console.error('Error fetching courses', error)
  //   );
  // }

  getCourses(): void {
    this.classService.getAllClasses().subscribe({
      next: (courses) => {
        // Filter out invalid teacher IDs
        const teacherIds = [...new Set(courses
          .map(c => c.teacher)
          .filter(id => id && id !== 'undefined'))];

        if (teacherIds.length === 0) {
          this.courses = courses;
          return;
        }

        forkJoin(teacherIds.map(id =>
          this.teacherService.getTeacherById(id).pipe(
            catchError(() => of(null)) // Handle missing teachers
          )
        )).subscribe(teachers => {
          this.courses = courses.map(course => ({
            ...course,
            teacher: teachers.find(t => t?._id === course.teacher) || null
          }));
          console.log('Mapped courses:', this.courses); // Verify mapping
        });
      },
      error: (error) => console.error('Error fetching courses', error)
    });
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
