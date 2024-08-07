import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';
import { UserDetails } from '../../../store/models/user.model';
import { USER_DETAILS_KEY } from '../../../utils/constants/keys/users/constants';
import { USER_DETAILS_COLUMNS } from '../../../utils/constants/table/users/table.constants';
import { UsersService } from '../../services/users.service';
import { AbsenceItem } from '../../../store/models/absence.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  detailsData!: UserDetails | null;

  tableData!: AbsenceItem[];
  columns = USER_DETAILS_COLUMNS;

  constructor(protected override store: Store<State>, private userService: UsersService) {
    super(store);
    this.setPageTitle('User Details')
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(store => store.userDetails).subscribe(details => {
        if (details) {
          this.detailsData = details
          localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(details))
        } else {
          if (localStorage.getItem(USER_DETAILS_KEY)) {
            this.detailsData = JSON.parse(localStorage.getItem(USER_DETAILS_KEY) as string)          }
        }
      })
    );
    this.absenceList();
  }

  addAbsence(): void {}

  ngOnDestroy() {
    this.setUserDetails(null);
    localStorage.removeItem(USER_DETAILS_KEY);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private absenceList(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.userService.getUserAbsenceList(`${this.detailsData?.FirstName} ${this.detailsData?.LastName}`).subscribe(list => {
        this.tableData = list
        this.setLoading(false);
      })
    )
  }
}
