import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LitterserviceService } from '../litterservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-edit',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Edit Pets data here</h3>
        <div class="card-body">
          <form [formGroup]="addForm" (ngSubmit)="handleEdit()">
            <div class="form-group">
              <label for="petname" class="form-label" class="form-label">
                Pet Name:
              </label>
              <input
                placeholder="petname"
                formControlName="petname"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="breed"> Breed: </label>
              <input
                class="form-control"
                placeholder="breed"
                formControlName="breed"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="request"> Request: </label>
              <input
                class="form-control"
                placeholder="request"
                formControlName="request"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="adoptStatus">
                Adoption Status:
              </label>
              <input
                class="form-control"
                placeholder="adoptStatus"
                formControlName="adoptStatus"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="weight"> Weight: </label>
              <input
                class="form-control"
                placeholder="weight"
                formControlName="weight"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="price"> Price: </label>
              <input
                class="form-control"
                placeholder="price"
                formControlName="price"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="birthdate"> Birth Date: </label>
              <input
                class="form-control"
                placeholder="birthdate"
                formControlName="birthdate"
              />
            </div>

            <button
              type="Submit"
              [disabled]="!addForm.valid"
              class="btn-btn-primary"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EditComponent {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LitterserviceService,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.addForm = formBuilder.group({
      _id: [''],
      petname: ['', Validators.required],
      breed: ['', Validators.required],
      request: ['', Validators.required],
      adoptStatus: ['', Validators.required],
      weight: ['', Validators.required],
      price: ['', Validators.required],
      birthdate: ['', Validators.required],
    });

    this.ac.paramMap
      .pipe(
        mergeMap((params) => this.service.listById(params.get('id') as string))
      )
      .subscribe((response) => {
        this.addForm.get('_id')?.setValue(response.data._id);
        this.addForm.get('petname')?.setValue(response.data.petname);
        this.addForm.get('breed')?.setValue(response.data.breed);
        this.addForm.get('request')?.setValue(response.data.request);
        this.addForm.get('adoptStatus')?.setValue(response.data.adoptStatus);
        this.addForm.get('weight')?.setValue(response.data.weight);
        this.addForm.get('price')?.setValue(response.data.price);
        this.addForm.get('birthdate')?.setValue(response.data.birthdate);
      });
  }
  handleEdit() {
    const formValue = {
      petname: this.addForm.value.petname,
      breed: this.addForm.value.breed,
      request: this.addForm.value.request,
      adoptStatus: this.addForm.value.adoptStatus,
      weight: this.addForm.value.weight,
      price: this.addForm.value.price,
      birthdate: this.addForm.value.birthdate,
    };

    this.service
      .edit(this.addForm.value._id, formValue)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/', 'litters']);
        }
      });
  }
}
