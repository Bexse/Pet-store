import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LitterserviceService } from './litterservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Sign Up</h3>
        <div class="card-body">
          <form [formGroup]="signupForm" (ngSubmit)="handleSubmit()">
            <div class="form-group">
              <label for="email" class="form-label"> Email </label>

              <input
                placeholder="email"
                class="form-control"
                formControlName="email"
              />
              <div *ngIf="!signupForm.get('email')?.valid">Invalid Email</div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label"> Password: </label>
              <input
                placeholder="password"
                class="form-control"
                formControlName="password"
              />
              <div *ngIf="!signupForm.get('password')?.valid">
                Please Enter your password
              </div>
            </div>
            
            <div class="form-group">
              <label for="role" class="form-label"> Role: </label>
              <input
                placeholder="role"
                class="form-control"
                formControlName="role"
              />
              <div *ngIf="!signupForm.get('password')?.valid">
                Please Enter your role
              </div>
            </div>
            <div class="form-group"></div>

            <button
              type="Submit"
              class="btn-btn-primary"
              [disabled]="!signupForm.valid"
            >
              Sign UP
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LitterserviceService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      role: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  handleSubmit() {
    const formValue = {
      password: this.signupForm.value.password,
      email: this.signupForm.value.email,
      role: this.signupForm.value.role,
    };

    this.service.signUp(formValue).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/', 'login']);
      }
    });
  }

  ngOnInit(): void {}
}
