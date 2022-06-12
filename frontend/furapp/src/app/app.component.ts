import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalstateService } from './globalstate.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav class="navbar bg-light">
        <div class="container-fluid">
          <h1>Welcome</h1>
        </div>
      </nav>

      <div *ngIf="globalState.token">
        <a [routerLink]="['/']"> Home</a>
        <a [routerLink]="['/', 'litters']" *ngIf="role === 'breeder'">
          Litters</a
        >
        <a [routerLink]="['/', 'litters', 'view']" *ngIf="role === 'buyer'">
          View Litters</a
        >
        <button (click)="logout()">Logout</button>
      </div>

      <div *ngIf="!globalState.token">
        <a [routerLink]="['/', 'login']"> Login</a>
        <a [routerLink]="['/', 'signUp']"> SignUp</a>
      </div>

      <router-outlet> </router-outlet>
    </div>
  `,
  styles: [
    `
      a {
        margin-right: 30px;
      }
    `,
  ],
})
export class AppComponent {
  globalState!: { token: any; data: any };
  role: string = '';

  constructor(
    private stateService: GlobalstateService,
    private router: Router
  ) {
    this.stateService.gloabalState.subscribe((state) => {
      this.globalState = state;
    });

    this.stateService.gloabalState.subscribe((state) => {
      this.role = state.data?.role;
    });
  }

  logout() {
    this.stateService.gloabalState.next({ token: null, data: null });
    this.router.navigate(['']);
  }
}
