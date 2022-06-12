import { Component, OnInit, Input } from '@angular/core';
import { Litter } from '../Litter';

@Component({
  selector: 'app-littercard',
  template: `


    <div class="card">
      <div class="container">
        <!-- <img [src]="userData.picture.medium" /> -->
        <h4>{{ litterData.breed }}: {{ litterData.adoptStatus }}</h4>
        <!-- <p>{{ litterData.dob.date | date: 'mediumDate' }}</p> -->
        <p>
          {{ litterData.adoptStatus }}
          {{ litterData.birthdate}},
        </p>
        <p>{{ litterData.request}}</p>
        <p>{{ litterData.weight }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 60%;
        margin: 10px;
      }

      .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      .container {
        padding: 2px 16px;
      }
    `,
  ],
})
export class LittercardComponent implements OnInit {
  @Input() litterData!: Litter;
  constructor() {}

  ngOnInit(): void {}
}
