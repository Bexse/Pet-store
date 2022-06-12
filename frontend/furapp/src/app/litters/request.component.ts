import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LitterserviceService } from '../litterservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';

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
    this.service
      .requestUpdate(this.requestForm.value._id, formValue)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/', 'litters', 'view']);
        } else {
          this.router.navigate(['/', 'litters', 'view']);
        }
      });
  }

  
}
