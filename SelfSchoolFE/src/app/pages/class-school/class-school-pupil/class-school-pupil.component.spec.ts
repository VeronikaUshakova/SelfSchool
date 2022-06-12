import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSchoolPupilComponent } from './class-school-pupil.component';

describe('ClassSchoolPupilComponent', () => {
  let component: ClassSchoolPupilComponent;
  let fixture: ComponentFixture<ClassSchoolPupilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSchoolPupilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSchoolPupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
