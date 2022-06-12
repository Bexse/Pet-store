import { Component, OnInit } from '@angular/core';
import { LitterserviceService } from '../litterservice.service';
import { Litter } from '../Litter';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalstateService } from '../globalstate.service';

@Component({
  selector: 'app-list',
  template: `
    <button (click)="handleAdd()">Add your pet</button>

    <div
      *ngFor="
        let litter of lists
          | paginate: { itemsPerPage: 5, id: 'lit', currentPage: p }
      "
    >
      <button
        [routerLink]="['/', 'litters', 'edit', litter._id]"
        [state]="litter"
      >
        <div class="card">
          <div class="container">
            <img [src]="litter.image" [alt]="litter.petname" />
            <h4>Name: {{ litter.petname }}</h4>
            <h4>Breed : {{ litter.breed }}</h4>
            <h4>DOB: {{ litter.birthdate }}</h4>
            <h4>weight: {{ litter.weight }}</h4>
            <h4>Price: {{ litter.price }}$</h4>
            <h4 *ngIf="show !== 'adopted'">
              Adoption Status: {{ litter.adoptStatus }}
            </h4>

            <h3>Request: {{ litter.request }}</h3>
            <h4>{{ litter.location[0] }}</h4>
          </div>
        </div>
      </button>
      <br />
      <button [routerLink]="['/', 'litters', 'adopt', litter._id]">
        Change Status
      </button>

      <!-- <button (click)="handleDelete(litter._id)">Delete</button> -->
    </div>
    <pagination-controls nextLabel="Next" id="lit" (pageChange)="p = $event">
    </pagination-controls>

    <router-outlet> </router-outlet>
  `,
  styles: [``],
})
export class ListComponent implements OnInit {
  p: number = 1;
  lists: Litter[] = [];
  show: string = '';

  constructor(
    private litterService: LitterserviceService,
    private router: Router,
    private global: GlobalstateService
  ) {
    global.gloabalState.subscribe((state) => {
      this.show = state.data?.adoptStatus;
    });
  }
  ngOnInit(): void {
    this.litterService.list().subscribe((response) => {
      this.lists = response.data;
    });
  }
  handleAdd() {
    this.router.navigate(['/litters/add']);
  }
}































// handleDelete(id: any) {
//   this.litterService.deleteById(id).subscribe((response) => {
//     console.log(response)
// this.lists.filter((litter: any) => {
//       litter.id !== id;
//     });
//   });
// }
