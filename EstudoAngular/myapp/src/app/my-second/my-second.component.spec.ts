import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySecondComponent } from './my-second.component';

describe('MySecondComponent', () => {
  let component: MySecondComponent;
  let fixture: ComponentFixture<MySecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
