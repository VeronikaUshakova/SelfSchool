import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSchoolComponent } from './class-school.component';

describe('ClassSchoolComponent', () => {
  let component: ClassSchoolComponent;
  let fixture: ComponentFixture<ClassSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
