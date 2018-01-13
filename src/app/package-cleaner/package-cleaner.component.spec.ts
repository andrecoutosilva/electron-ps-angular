import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCleanerComponent } from './package-cleaner.component';

describe('PackageCleanerComponent', () => {
  let component: PackageCleanerComponent;
  let fixture: ComponentFixture<PackageCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
