import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { AbsenceCreateItem, AbsenceDefinitionItem } from '../../../store/models/absence.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';

@Component({
  selector: 'app-new-absence-dialog',
  templateUrl: './new-absence-dialog.component.html',
  styleUrl: './new-absence-dialog.component.scss'
})
export class NewAbsenceDialogComponent extends StoreManagerComponent implements OnInit {
  subscriptions: Subscription[] = [];
  newAbsenceForm!: FormGroup;
  absenceDefinitions: AbsenceDefinitionItem[] = [];
  selected: boolean = false;

  constructor(
      protected override store: Store<State>,
      public dialogRef: MatDialogRef<NewAbsenceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder,
      private userService: UsersService
    ) {
    super(store)
    this.initNewAbsenceForm();
  }

  ngOnInit(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.userService.getAbsenceDefinitionList().subscribe(definitions => {
        this.absenceDefinitions = definitions;
        this.setLoading(false);
      })
    )
  }

  selectChanged(event: any): void {
    this.newAbsenceForm.get('AbsenceDefinitionId')?.setValue(event.value);
    this.selected = true;
  }

  create(): void {
    const absenceToCreate: AbsenceCreateItem = {
      ...this.newAbsenceForm.getRawValue(),
      UserId: this.data.Id,
      Timestamp: new Date().toISOString(),
      PartialTimeFrom: new Date().toISOString(),
      PartialTimeTo: new Date().toISOString(),
      PartialTimeDuration: 0,
      IsPartial: false,
      Comment: '',
      OverrideHolidayAbsence: false,
      Origin: 0
    }
    this.dialogRef.close(absenceToCreate)
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  private initNewAbsenceForm(): void {
    this.newAbsenceForm = this.formBuilder.group({
      AbsenceDefinitionId: [null, Validators.required],
      Comment: [null],
    })
  }
}
