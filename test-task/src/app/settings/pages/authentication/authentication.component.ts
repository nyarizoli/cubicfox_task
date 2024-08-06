import { Component, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../../environments/environment.development';
import { LoginCredentials } from '../../../store/models/login.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent extends StoreManagerComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(protected override store: Store<State>, private loginService: LoginService, private authService: AuthService) {
    super(store);
    this.setPageTitle('Settings');
    this.loginService.login({client_id: environment.CLIENT_ID, client_secret: environment.CLIENT_SECRET} as LoginCredentials).subscribe(token => {
      this.authService.storeToken(token.access_token);
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
