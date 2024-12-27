import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeachersComponent } from './listteachers.component';

describe('ListTeachersComponent', () => {
  let component: ListTeachersComponent;
  let fixture: ComponentFixture<ListTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTeachersComponent]
    });
    fixture = TestBed.createComponent(ListTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
