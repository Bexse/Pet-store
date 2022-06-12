import { Component, OnInit } from '@angular/core';
import { LitterserviceService } from '../litterservice.service';
import { Litter } from '../Litter';
import { Router } from '@angular/router';
import { GlobalstateService } from '../globalstate.service';
import { HttpClient } from '@angular/common/http';
import config from '../config';

@Component({
  selector: 'app-view',
  template: `
    <p>View list of litters for Adoption!</p>

    <div>
      <div
        *ngFor="
          let litter of lists
            | paginate: { itemsPerPage: 5, id: 'lit', currentPage: p }
        "
      >
        <div class="card">
          <div class="container">
            <img [src]="litter.image" [alt]="litter.petname" />
            <h4>Name: {{ litter.petname }}</h4>
            <h4>Breed : {{ litter.breed }}</h4>
            <h4>DOB: {{ litter.birthdate }}</h4>
            <h4>weight: {{ litter.weight }}</h4>
            <h4>Price: {{ litter.price }}$</h4>
            <h4 style="color: red">
              Adoption Status: {{ litter.adoptStatus }}
            </h4>
            <h3>Request: {{ litter.request }}</h3>
            <p>{{ litter.location[0] }}</p>
          </div>
        </div>

        <button [routerLink]="['/', 'litters', 'view', litter._id]">
          Send Request
        </button>
      </div>
    </div>
    <pagination-controls
      nextLabel="Next"
      id="lit"
      (pageChange)="p = $event"
    ></pagination-controls>
  `,
  styles: [],
})
export class ViewComponent implements OnInit {
  p: number = 1;
  lists: Litter[] = [];
  long!: number;
  lat!: number;

  constructor(
    private litterService: LitterserviceService,
    private router: Router,
    private global: GlobalstateService,
    private http: HttpClient
  ) {
   
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;

            this.http
              .get<{ success: boolean; data: Array<Litter> }>(
                `${config.server}/api/litters/?currentLong=${this.long}&currentLat=${this.lat}`
              )
              .subscribe((response) => {
                this.lists = response.data;
              });
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
