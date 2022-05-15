import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSchoolListComponent } from './class-school-list.component';

describe('ClassSchoolListComponent', () => {
  let component: ClassSchoolListComponent;
  let fixture: ComponentFixture<ClassSchoolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSchoolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSchoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
