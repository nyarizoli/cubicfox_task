import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../../environments/environment.development';
import { LoginCredentials } from '../../../store/models/login.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { StoreManagerComponent } from '../../../shared-components/store-manager/store-manager.component';
import { Store } from '@ngrx/store';
import { State } from '../../../store/models/state.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent extends StoreManagerComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  authFormGroup!: FormGroup;

  constructor(protected override store: Store<State>, private loginService: LoginService, private authService: AuthService, private formBuilder: FormBuilder) {
    super(store);
    this.setPageTitle('Settings');
    this.initAuthForm();
  }

  ngOnInit(): void {
      if (this.loggedIn()) {
        this.authFormGroup.get('client_id')?.setValue(environment.CLIENT_ID);
        this.authFormGroup.get('client_secret')?.setValue(environment.CLIENT_SECRET);
      }
  }

  loginCustom(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.loginService.login(this.authFormGroup.getRawValue() as LoginCredentials).subscribe(token => {
        this.authService.storeToken(token.access_token);
        this.setLoading(false);
      }, err => {
        this.setLoading(false);
      })
    )
  }

  login(): void {
    this.setLoading(true);
    this.subscriptions.push(
      this.loginService.login({client_id: environment.CLIENT_ID, client_secret: environment.CLIENT_SECRET} as LoginCredentials).subscribe(token => {
        this.authService.storeToken(token.access_token);
        this.authFormGroup.get('client_id')?.setValue(environment.CLIENT_ID);
        this.authFormGroup.get('client_secret')?.setValue(environment.CLIENT_SECRET);
        this.setLoading(false);
      }, err => {
        this.setLoading(false);
      })
    )
  }

  logout(): void {
    this.authService.removeToken();
    this.authFormGroup.reset();
  }

  loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initAuthForm(): void {
    this.authFormGroup = this.formBuilder.group({
      client_id: [null, Validators.required],
      client_secret: [null, Validators.required],
    })
  }
}
