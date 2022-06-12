import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LitterserviceService } from './litterservice.service';
import jwt_decode from 'jwt-decode';
import { GlobalstateService } from './globalstate.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Welcome</h3>
        <div class="card-body">
          <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
            <div class="form-group">
              <label for="email"> Email: </label>
              <input
                type="text"
                placeholder="email"
                formControlName="email"
                class="form-control"
              />
              <div *ngIf="!loginForm.get('email')?.valid">Invalid Email</div>
            </div>

            <div class="form-group">
              <label for="password"> Password: </label>
              <input
                type="password"
                placeholder="password"
                formControlName="password"
                class="form-control"
              />
              <div *ngIf="!loginForm.get('password')?.valid">
                Please Enter your password
              </div>
            </div>

            <button
              type="submit"
              [disabled]="!loginForm.valid"
              class="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: LitterserviceService,
    private router: Router,
    private state: GlobalstateService
  ) {
    this.loginForm = fb.group({
      password: ['123456', Validators.required],
      email: [
        'esubex@gmail.com',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }
  handleLogin() {
    this.submitted = true;

    this.service.login(this.loginForm.value).subscribe((response) => {
      const token = response.data;
      const decoded = jwt_decode(token);
      this.state.gloabalState.next({ token, data: decoded });
      this.router.navigate(['']);
    });
  }
}
