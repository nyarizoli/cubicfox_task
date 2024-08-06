import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
