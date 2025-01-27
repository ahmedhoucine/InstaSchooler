import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'student-root',
  template: `<router-outlet></router-outlet>`, // Ensures child routes render here
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  title: any;
  ngOnInit() {
    console.log('StudentComponent initialized'); // Debug message
  }
}
