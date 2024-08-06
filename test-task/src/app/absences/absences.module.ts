import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesRoutingModule } from './absences-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule,
    MaterialModule
  ]
})
export class AbsencesModule { }
