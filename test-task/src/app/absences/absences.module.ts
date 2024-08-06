import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesRoutingModule } from './absences-routing.module';
import { ListComponent } from './pages/list/list.component';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AbsencesRoutingModule
  ]
})
export class AbsencesModule { }
