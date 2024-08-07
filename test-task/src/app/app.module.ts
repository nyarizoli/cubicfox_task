import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GlobalErrorHandlerService } from './utils/error/global-error-handler.service';
import { MessageNotificationService } from './utils/message/message.service';
import { MaterialModule } from './material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutComponent } from './shared-components/layout/layout.component';
import { LoadingScreenComponent } from './shared-components/loading-screen/loading-screen.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';
import { ToolbarComponent } from './shared-components/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { REDUCERS } from './store/reducers/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ToolbarComponent,
    NavbarComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    StoreModule.forRoot(REDUCERS)
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    provideNativeDateAdapter(),
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    MessageNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
