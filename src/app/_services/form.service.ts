import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  base: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addCampaign(data: any): any {
    const url = this.base + '/ngo/event';
    return this.http.post(url, {data: data});
  }
}
