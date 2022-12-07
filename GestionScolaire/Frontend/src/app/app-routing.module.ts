import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ForgotPasswordComponent } from './user-pages/forgot-password/forgot-password.component';
import { LoginComponent } from './user-pages/login/login.component';
import { RegisterComponent } from './user-pages/register/register.component';
import { ResetPasswordComponent } from './user-pages/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
