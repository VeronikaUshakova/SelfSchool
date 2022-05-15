import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDetailComponent } from './pupil-detail.component';

describe('PupilDetailComponent', () => {
  let component: PupilDetailComponent;
  let fixture: ComponentFixture<PupilDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PupilDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
