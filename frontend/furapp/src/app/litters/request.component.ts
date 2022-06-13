import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LitterserviceService } from '../litterservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalstateService } from '../globalstate.service';
import { mergeMap } from 'rxjs';
import { User } from '../User';

@Component({
  selector: 'app-request',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Request form</h3>

        <form [formGroup]="requestForm" (ngSubmit)="handleRequest()">
          <div class="form-group">
            <label class="form-label" for="request"> Request: </label>
            <input
              placeholder="write request- email here"
              class="form-control"
              formControlName="request"
            />
          </div>

          <button
            type="Submit"
            class="btn-btn-primary"
            [disabled]="!requestForm.valid"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class RequestComponent {
  userState!: {token: any, data: any}; // quick trial
  buyer!: User;
  email!: string;
  requestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LitterserviceService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.requestForm = formBuilder.group({
      _id: [''],
      request: ['', Validators.required],
    });
       this.stateService.gloabalState.subscribe((state) => {
      this.userState = state;
      this.buyer = state.data?.role;
      this.email = state.data?.email;
      console.log(this.buyer);
    });
      
      
    this.ac.paramMap
      .pipe(
        mergeMap((params) => this.service.listById(params.get('id') as string))
      )
      .subscribe((response) => {
        this.requestForm.get('_id')?.setValue(response.data._id);
        this.requestForm.get('request')?.setValue(response.data.request);
      });
  }
  handleRequest() {
    const formValue = {
      request: this.requestForm.value.request,
    };
     const requestform = {...formValue, email: this.email}

    this.service
      .requestUpdate(this.requestForm.value._id, requestform)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/', 'litters', 'view']);
        } else {
          this.router.navigate(['/', 'litters', 'view']);
        }
      });
  }

  
}
