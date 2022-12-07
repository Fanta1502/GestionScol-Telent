import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './user-pages/login/login.component';
import { RegisterComponent } from './user-pages/register/register.component';
import { AuthInterceptor } from './user-pages/auth.interceptor';
import { AuthGuard } from './user-pages/auth.guard';
import { ForgotPasswordComponent } from './user-pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user-pages/reset-password/reset-password.component';
import { SpinnerComponent } from './user-pages/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [ThemeService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
      AuthGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
