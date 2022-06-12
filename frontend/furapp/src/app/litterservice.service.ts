import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from './config';
import { Litter } from './Litter';

@Injectable({
  providedIn: 'root',
})
export class LitterserviceService {
  long!: number;
  lat!: number;
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<{ success: boolean; data: Array<Litter> }>(
      `${config.server}/api/litters/`
    );
  }
  

  listById(id: string) {
    return this.http.get<{ success: boolean; data: Litter }>(
      `${config.server}/api/litters/${id}`
    );
  }
  add(litter: any) {
    return this.http.post<{ success: Boolean; data: Litter }>(
      `${config.server}/api/litters/add`,
      litter
    );
  }
  edit(id: string, litter: any) {
    return this.http.put<{ success: Boolean; data: Litter }>(
      `${config.server}/api/litters/${id}`,
      litter
    );
  }
  requestUpdate(id: string, request: any) {
    return this.http.put<{ success: Boolean; data: Litter }>(
      `${config.server}/api/litters/request/${id}`,
      request
    );
  }

  adoptStatusUpdate(id: string, status: any) {
    return this.http.put<{ success: Boolean; data: any }>(
      `${config.server}/api/litters/adopted/${id}`,
      status
    );
  }

  login(obj: any) {
    return this.http.post<{ success: boolean; data: any }>(
      `${config.server}/api/users/login`,
      obj
    );
  }
  signUp(obj: any) {
    return this.http.post<{ success: boolean; data: any }>(
      `${config.server}/api/users/signUp`,
      obj
    );
  }
  deleteById(id: string){
    return this.http.delete<{ success: Boolean; data:Litter }> (
      `${config.server}/api/litters/${id}`);

  }


}
