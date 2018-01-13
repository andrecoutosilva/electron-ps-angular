import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionCheckerComponent } from './version-checker.component';

describe('VersionCheckerComponent', () => {
  let component: VersionCheckerComponent;
  let fixture: ComponentFixture<VersionCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
