import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { USERS_TABLES_COLUMNS } from '../../../utils/constants/table/users/table.constants';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  cols!: number;

  filter!: string;

  tableData!: any;
  columns = USERS_TABLES_COLUMNS;

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  }

  constructor(protected override store: Store<State>, private breakpointObserver: BreakpointObserver, private userService: UsersService) {
    super(store)
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getUserList().subscribe(list => {
        this.tableData = list
      })
    )
  }

  changeModel(event: any): void {
    this.filter = event;
  }

  searchFilter(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.userService.searchUserList(this.filter).subscribe(list => {
        this.tableData = list
        this.setLoading(false);
      })
    )
  }

  refresh(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.userService.getUserList().subscribe(list => {
        this.tableData = list
        this.setLoading(false);
        this.filter = ''
      })
    )
  }

  addPerson(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
