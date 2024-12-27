import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCardsComponent } from './feature-card.component';

describe('FeatureCardComponent', () => {
  let component: FeatureCardsComponent;
  let fixture: ComponentFixture<FeatureCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureCardsComponent]
    });
    fixture = TestBed.createComponent(FeatureCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
