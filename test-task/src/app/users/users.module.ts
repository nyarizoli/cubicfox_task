import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../material.module';
import { UsersService } from './services/users.service';
import { UniversalDatatableComponent } from '../shared-components/universal-datatable/universal-datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserDialogComponent } from './components/new-user-dialog/new-user-dialog.component';
import { DetailsComponent } from './pages/details/details.component';
import { NewAbsenceDialogComponent } from './components/new-absence-dialog/new-absence-dialog.component';



@NgModule({
  declarations: [
    ListComponent,
    NewUserDialogComponent,
    DetailsComponent,
    NewAbsenceDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule,
    UniversalDatatableComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
