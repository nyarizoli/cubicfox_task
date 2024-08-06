import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageNotificationService } from '../utils/message/message.service';
import { StoreManagerComponent } from '../shared-components/store-manager/store-manager.component';
import { Store } from '@ngrx/store';
import { State } from '../store/models/state.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends StoreManagerComponent implements CanActivate {

  constructor(protected override store: Store<State>, private authService: AuthService, private router: Router, private messageService: MessageNotificationService) {
    super(store)
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.messageService.showError('To visit this page you should sign in first.');
      this.setPageTitle('Settings')
      this.router.navigate(['/settings']);
      return false;
    }
  }
}
