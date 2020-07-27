import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgForFormComponent } from './ng-for-form.component';

describe('NgForFormComponent', () => {
  let component: NgForFormComponent;
  let fixture: ComponentFixture<NgForFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgForFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgForFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
