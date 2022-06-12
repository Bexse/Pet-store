import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalstateService {

gloabalState: BehaviorSubject< {token: any, data: any} >  = new BehaviorSubject({token: null, data: null});
  constructor() { }
}
