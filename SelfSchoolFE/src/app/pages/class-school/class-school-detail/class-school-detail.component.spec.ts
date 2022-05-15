import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSchoolDetailComponent } from './class-school-detail.component';

describe('ClassSchoolDetailComponent', () => {
  let component: ClassSchoolDetailComponent;
  let fixture: ComponentFixture<ClassSchoolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSchoolDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSchoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
