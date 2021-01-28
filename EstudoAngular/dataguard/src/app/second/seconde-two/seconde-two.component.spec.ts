import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondeTwoComponent } from './seconde-two.component';

describe('SecondeTwoComponent', () => {
  let component: SecondeTwoComponent;
  let fixture: ComponentFixture<SecondeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondeTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
