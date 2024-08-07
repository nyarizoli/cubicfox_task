import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAbsenceDialogComponent } from './new-absence-dialog.component';

describe('NewAbsenceDialogComponent', () => {
  let component: NewAbsenceDialogComponent;
  let fixture: ComponentFixture<NewAbsenceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAbsenceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
