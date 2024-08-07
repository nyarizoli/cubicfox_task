import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {StoreManagerComponent} from "../store-manager/store-manager.component";
import {Store} from "@ngrx/store";
import {State} from "../../store/models/state.model";
import {merge, skip, startWith, Subscription} from "rxjs";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'app-universal-datatable',
  templateUrl: './universal-datatable.component.html',
  styleUrl: './universal-datatable.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    NgForOf,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatIconButton,
    MatButtonModule,
    NgIf,
  ],
})
export class UniversalDatatableComponent extends StoreManagerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input()
  haveDetails: boolean = false;
  @Input()
  enablePaging: boolean = true;
  @Input()
  displayedColumns: any = [];
  @Input()
  tableData?: any = [];
  @Input()
  detailsBaseUrl: string = '';

  columnsToShow: string[] = [];
  dataSource?: any;
  emptyData = new MatTableDataSource([{ empty: "row" }]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator?: MatPaginator

  constructor(protected override store: Store<State>, private router: Router, private changeRef: ChangeDetectorRef) {
    super(store);
  }

  ngOnInit() {
    this.columnsToShow = this.displayedColumns.map((item: any) => item.value);
    if (this.haveDetails) {
      this.columnsToShow = [
        ...this.columnsToShow,
        'details'
      ];
    }

    this.dataSource = null;
    if (this.tableData) {
      this.dataSource = new MatTableDataSource(this.tableData);
    }
    this.changeRef.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      if (this.enablePaging) {
        this.dataSource.paginator = this.paginator;
      }
    }

    this.changeRef.detectChanges();

    if (this.enablePaging) {
      this.subscriptions.push(
        merge(this.sort?.sortChange as any, this.paginator?.page as any).pipe(
          startWith({}),
          skip(1),
        ).subscribe((change: any) => {
          if (this.dataSource) {
            if (change.active) {
              this.dataSource.sort = this.sort;
            } else if (change.pageIndex) {
              this.dataSource.paginator = this.paginator
              const paginatorInputElement = document.querySelector('.mat-select-panel') as HTMLElement;
              if (paginatorInputElement) {
                paginatorInputElement.style.display = 'none';
              }
            }
          }
          this.changeRef.detectChanges();
        })
      )
    } else {
      this.subscriptions.push(
        this.sort?.sortChange.pipe(
          startWith({}),
          skip(1),
        ).subscribe((change: any) => {
          if (this.dataSource) {
            if (change.active) {
              this.dataSource.sort = this.sort;
            } else if (change.pageIndex) {
              this.dataSource.paginator = this.paginator
            }
          }
          this.changeRef.detectChanges();
        })
      )
    }
  }

  openDetails(element: any): void {
    this.setUserDetails(element);
    this.router.navigate([`${this.detailsBaseUrl}/${element.Id}`])
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    if (this.enablePaging) {
      this.dataSource.paginator = this.paginator
    }
    this.changeRef.detectChanges();
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.dataSource = null;
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

