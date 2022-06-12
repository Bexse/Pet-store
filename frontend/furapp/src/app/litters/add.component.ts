import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LitterserviceService } from '../litterservice.service';
import { Litter } from '../Litter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  template: `
    <div class="col-md-6 offset-md-3 mt-5">
      <div class="card">
        <h3 class="card-header">Add Pets here</h3>
        <div class="card-body">
          <form
            [formGroup]="addForm"
            enctype="multipart/form-data"
            (ngSubmit)="handleAdd()"
          >
            <div class="form-group">
              <label for="image"> Image: </label>
              <input
                type="file"
                placeholder="image"
                #fileUplaoder
                (change)="selectImage($event)"
                formControlName="image"
              />
              <div *ngIf="!addForm.get('image')?.valid">Select Image</div>
            </div>
            <br />
            <button
              type="button"
              class="btn-btn-primary"
              (click)="fileUplaoder.click()"
            >
              Upload
            </button>
            <br />
            <!-- <img [src]="preview" [alt]="addForm.value.petname" /> -->
            <div class="form-group">
              <label for="petname" class="form-label" class="form-label">
                Pet Name:
              </label>
              <input
                placeholder="petname"
                formControlName="petname"
                class="form-control"
              />
              <div *ngIf="!addForm.get('petname')?.valid">Add pet name</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="breed"> Breed: </label>
              <input
                class="form-control"
                placeholder="breed"
                formControlName="breed"
              />
              <div *ngIf="!addForm.get('breed')?.valid">Add breed</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="request"> Request: </label>
              <input
                class="form-control"
                placeholder="request"
                formControlName="request"
              />
              <div *ngIf="!addForm.get('request')?.valid">Invalid</div>
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
              <div *ngIf="!addForm.get('adoptStatus')?.valid">
                Add Adoption Status
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="weight"> Weight: </label>
              <input
                class="form-control"
                placeholder="weight"
                formControlName="weight"
              />
              <div *ngIf="!addForm.get('weight')?.valid">Add weight</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="price"> Price: </label>
              <input
                class="form-control"
                placeholder="price"
                formControlName="price"
              />
              <div *ngIf="!addForm.get('price')?.valid">Add price</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="birthdate"> Birth Date: </label>
              <input
                class="form-control"
                placeholder="birthdate"
                formControlName="birthdate"
              />
              <div *ngIf="!addForm.get('birthdate')?.valid">Add date</div>
            </div>

            <button
              type="Submit"
              [disabled]="!addForm.valid"
              class="btn-btn-primary"
            >
              Add Pet
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  long!: number;
  lat!: number;
  preview!: string; // is the url of the image.
  constructor(
    private formBuilder: FormBuilder,
    private service: LitterserviceService,
    private router: Router
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
      long: [''],
      lat: [''],
      image: [null],
    });
  }

  handleAdd() {
    const formValue = {
      petname: this.addForm.value.petname,
      breed: this.addForm.value.breed,
      request: this.addForm.value.request,
      adoptStatus: this.addForm.value.adoptStatus,
      weight: this.addForm.value.weight,
      price: this.addForm.value.price,
      birthdate: this.addForm.value.birthdate,
      location: [this.long, this.lat],
      image: this.addForm.value.image,
    };

    const litterData = new FormData();
    litterData.append('petname', formValue.petname);
    litterData.append('breed', formValue.breed);
    litterData.append('request', formValue.request);
    litterData.append('adoptStatus', formValue.adoptStatus);
    litterData.append('weight', formValue.weight);
    litterData.append('price', formValue.price);
    litterData.append('birthdate', formValue.birthdate);
    litterData.append('image', formValue.image);
    litterData.append('location', formValue.location[0] as any);
    litterData.append('location', formValue.location[1] as any);

    this.service.add(litterData).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/', 'litters']);
      }
    });
  }

  ngOnInit(): void {
    this.getLocation();
  }
  selectImage(event: any) {
    const file = event.target.files[0]; 

    if (event.target.files.length > 0) {
      this.addForm.patchValue({
        image: file,
      });
    }
    this.addForm.get('image')?.updateValueAndValidity(); 
    const reader = new FileReader(); 
    reader.onload = () => {
      this.preview = reader.result as string; 
    };


  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
