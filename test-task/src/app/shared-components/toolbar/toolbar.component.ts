import {Component, OnDestroy} from '@angular/core';
import {StoreManagerComponent} from "../store-manager/store-manager.component";
import {Store} from "@ngrx/store";
import {State} from "../../store/models/state.model";
import {Subscription} from "rxjs";
import { USERNAME_KEY } from '../../utils/constants/keys/authentication/authentication.constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent extends StoreManagerComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(protected override store: Store<State>) {
    super(store);
  }

  getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
