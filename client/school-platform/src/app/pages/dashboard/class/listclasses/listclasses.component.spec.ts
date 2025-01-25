import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListclassesComponent } from './listclasses.component';

describe('ListclassesComponent', () => {
  let component: ListclassesComponent;
  let fixture: ComponentFixture<ListclassesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListclassesComponent]
    });
    fixture = TestBed.createComponent(ListclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
