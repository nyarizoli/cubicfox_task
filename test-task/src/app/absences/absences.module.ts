import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesRoutingModule } from './absences-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalDatatableComponent } from '../shared-components/universal-datatable/universal-datatable.component';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UniversalDatatableComponent
  ],
  providers: []
})
export class AbsencesModule { }
