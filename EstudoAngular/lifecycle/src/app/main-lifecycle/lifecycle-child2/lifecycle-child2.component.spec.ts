import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleChild2Component } from './lifecycle-child2.component';

describe('LifecycleChild2Component', () => {
  let component: LifecycleChild2Component;
  let fixture: ComponentFixture<LifecycleChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifecycleChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifecycleChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
