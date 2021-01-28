import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondeOneComponent } from './seconde-one.component';

describe('SecondeOneComponent', () => {
  let component: SecondeOneComponent;
  let fixture: ComponentFixture<SecondeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondeOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
