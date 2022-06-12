import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LitterserviceService } from '../litterservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
@Component({
  selector: 'app-adoptstatus',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Adoption Status</h3>

        <form
          [formGroup]="adoptStatusChangeForm"
          (ngSubmit)="handleAdoptStatus()"
        >
          <div class="form-group">
            <label class="form-label" for="adoptStatus">
              Adoption Status
            </label>
            <input
              placeholder="status of adoption"
              class="form-control"
              formControlName="adoptStatus"
            />
          </div>

          <button
            type="Submit"
            class="btn-btn-primary"
            [disabled]="!adoptStatusChangeForm.valid"
          >
            Change Status
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AdoptstatusComponent {
  adoptStatusChangeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LitterserviceService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.adoptStatusChangeForm = formBuilder.group({
      _id: [''],
      adoptStatus: ['', Validators.required],
    });
    this.ac.paramMap
      .pipe(
        mergeMap((params) => this.service.listById(params.get('id') as string))
      )
      .subscribe((response) => {
        this.adoptStatusChangeForm.get('_id')?.setValue(response.data._id);
        this.adoptStatusChangeForm
          .get('adoptStatus')
          ?.setValue(response.data.adoptStatus);
      });
  }
  handleAdoptStatus() {
    const formValue = {
      adoptStatus: this.adoptStatusChangeForm.value.adoptStatus,
    };
    this.service
      .adoptStatusUpdate(this.adoptStatusChangeForm.value._id, formValue)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/', 'litters']);
        } else {
          this.router.navigate(['/', 'litters']);
        }
      });
  }
}
