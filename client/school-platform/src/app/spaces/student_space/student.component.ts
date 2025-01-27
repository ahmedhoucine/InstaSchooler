import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'teacher-root',
  template: `<router-outlet></router-outlet>`, // Ensures child routes render here
  styleUrls: ['./teacher.component.css'],
})
export class StudentComponent implements OnInit {
  title: any;
  ngOnInit() {
    console.log('StudentComponent initialized'); // Debug message
  }
}
