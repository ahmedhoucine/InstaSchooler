import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherComponent } from './editteacher.component';

describe('EditTeacherComponent', () => {
  let component: EditTeacherComponent;
  let fixture: ComponentFixture<EditTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTeacherComponent]
    });
    fixture = TestBed.createComponent(EditTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
