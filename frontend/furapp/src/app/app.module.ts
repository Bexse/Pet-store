import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddtokenInterceptor } from './addtoken.interceptor';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signUp',
        component: SignupComponent,
      },
      {
        path: 'litters',
        loadChildren: () =>
          import('./litters/litters.module').then((m) => m.LittersModule),
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddtokenInterceptor, multi: true },
  ], 
  bootstrap: [AppComponent],
})
export class AppModule {}
