import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  base: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addCampaign(data: any): any {
    const url = this.base + '/ngo/event/';
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin',' *');
    headers.set('Access-Control-Allow-Methods',' GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers',' Origin')
    headers.set('Content-Type',' X-Auth-Token')
    return this.http.post(url, {data: data}, {headers: headers} );
  }

  getImageURL(image): any{
    const url = "https://file.io?expires=1w";
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin',' *');
    headers.set('Access-Control-Allow-Methods',' GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers',' Origin')
    headers.set('Content-Type',' X-Auth-Token');
    return this.http.post(url, {files: {file: image}}, {headers: headers} );
  }
}
