import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';
import { AbsenceService } from '../../services/absence.service';
import { ABSENCES_COLUMNS } from '../../../utils/constants/table/absences/table.constants';
import { AbsenceListItem } from '../../../store/models/absence.model';

@Component({
  selector: 'app-absences-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  filter!: string | Date;

  tableData!: AbsenceListItem[];
  columns = ABSENCES_COLUMNS;

  constructor(protected override store: Store<State>, private absenceService: AbsenceService) {
    super(store)
  }

  ngOnInit(): void {
      this.tableData = [];
  }

  searchFilter(): void {
    this.searchList();
  }

  changeModel(event: any): void {
    this.filter = new Date(event).toISOString();
  }

  refresh(): void {
    this.searchList();
  }

  clear(): void {
    this.filter = '';
    this.tableData = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private searchList(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.absenceService.searchAbsenceList(this.filter).subscribe((list: AbsenceListItem[]) => {
        this.tableData = list
        this.setLoading(false);
      })
    )
  }
}
