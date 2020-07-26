import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyThirdComponent } from './my-third.component';

describe('MyThirdComponent', () => {
  let component: MyThirdComponent;
  let fixture: ComponentFixture<MyThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
