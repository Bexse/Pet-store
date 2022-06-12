import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { GlobalstateService } from './globalstate.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectGuard implements CanActivate {
  constructor(private global: GlobalstateService){
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route, 'guard ');
     return this.global.gloabalState.pipe(
       map ((state: {token: any, data: any})=> {
        if(state.token) return true; 
        return false;
      })
  
     )
    }
}
