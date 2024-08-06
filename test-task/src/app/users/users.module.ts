import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MaterialModule } from '../material.module';
import { UsersService } from './services/users.service';
import { UniversalDatatableComponent } from '../shared-components/universal-datatable/universal-datatable.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MaterialModule,
    UniversalDatatableComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
