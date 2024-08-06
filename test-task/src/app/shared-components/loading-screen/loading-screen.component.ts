import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreManagerComponent } from '../store-manager/store-manager.component';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import {State} from "../../store/models/state.model";

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
})
export class LoadingScreenComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private spinner: NgxSpinnerService,  protected override store: Store<State>) {
    super(store);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select(store => store.isLoading).subscribe(loading => {
      if (loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
