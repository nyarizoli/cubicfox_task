import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import { UserCreate } from '../../../store/models/user.model';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrl: './new-user-dialog.component.scss'
})
export class NewUserDialogComponent {
  newUserForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>, private formBuilder: FormBuilder) {
    this.initNewUserForm();
  }

  create(): void {
    this.dialogRef.close(this.newUserForm.getRawValue() as UserCreate)
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  private initNewUserForm(): void {
    this.newUserForm = this.formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
    })
  }
}
