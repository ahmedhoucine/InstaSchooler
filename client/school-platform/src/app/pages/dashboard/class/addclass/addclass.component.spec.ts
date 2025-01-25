import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassComponent } from './addclass.component';

describe('AddClassComponent', () => {
  let component: AddClassComponent;
  let fixture: ComponentFixture<AddClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClassComponent]
    });
    fixture = TestBed.createComponent(AddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
