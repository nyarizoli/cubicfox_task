import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { USER_DETAILS_BASE_URL, USERS_TABLES_COLUMNS } from '../../../utils/constants/table/users/table.constants';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../../components/new-user-dialog/new-user-dialog.component';
import { UserCreate } from '../../../store/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  filter!: string;

  tableData!: any;
  columns = USERS_TABLES_COLUMNS;
  detailBaseUrl = USER_DETAILS_BASE_URL;

  constructor(protected override store: Store<State>, private userService: UsersService, private dialog: MatDialog) {
    super(store)
  }

  ngOnInit(): void {
    this.getUserList();
  }

  changeModel(event: any): void {
    this.filter = event;
  }

  searchFilter(): void {
    this.searchList();
  }

  refresh(): void {
    if (this.filter) {
      this.searchList();
    } else {
      this.getUserList();
    }
  }

  clearFilter(): void {
    this.filter = '';
    this.getUserList();
  }

  addPerson(): void {
    this.subscriptions.push(
      this.dialog.open(NewUserDialogComponent).afterClosed().subscribe((dialogData: UserCreate | null) => {
        if (dialogData) {
          this.setLoading(true);
          this.subscriptions.push(
            this.userService.addUser(dialogData as UserCreate).subscribe(created => {
              this.setLoading(false);
              this.refresh();
            })
          )
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private getUserList(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.userService.getUserList().subscribe(list => {
        this.tableData = list
        this.setLoading(false);
      })
    )
  }

  private searchList(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.userService.searchUserList(this.filter).subscribe(list => {
        this.tableData = list
        this.setLoading(false);
      })
    )
  }
}
