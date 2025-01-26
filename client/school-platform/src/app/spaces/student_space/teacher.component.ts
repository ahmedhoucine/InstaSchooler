import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'teacher-root',
  template: `<router-outlet></router-outlet>`, // Ensures child routes render here
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  title: any;
  ngOnInit() {
    console.log('TeacherComponent initialized'); // Debug message
  }
}
