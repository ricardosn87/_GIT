import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotObervablesIntroComponent } from './hot-obervables-intro.component';

describe('HotObervablesIntroComponent', () => {
  let component: HotObervablesIntroComponent;
  let fixture: ComponentFixture<HotObervablesIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotObervablesIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotObervablesIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
