import { Component, OnInit } from '@angular/core';
import { GlobalstateService } from './globalstate.service';

@Component({
  selector: 'app-home',
  template: `
    <p *ngIf='welcome'>Welcome {{welcome}} </p>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  welcome: string = ''
  constructor(private global: GlobalstateService) {
    global.gloabalState.subscribe(state => {
      this.welcome = state.data?.email;
    })

  }

  ngOnInit(): void {}
}
