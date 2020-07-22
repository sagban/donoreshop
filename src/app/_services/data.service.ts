import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base: any = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAWSProducts(data):any{
    const url = this.base + '/ngo/products/'+data;
    return this.http.get(url, {params: {}// <=========== important!
    });
  }
  getAllCampaigns():any{
    const url = this.base + '/ngo/events/1';
    return this.http.get(url, {params: {}// <=========== important!
    });
  }


  getDesignerProfile(data):any {
    const url = this.base + '/designer_profile';
    return this.http.get(url, {params: {username: data},
      withCredentials: true  // <=========== important!
    });
  }

  getProducts(f, s):any{
    const url = this.base + '/product';
    return this.http.get(url, {params:{f:f, s:s},
      withCredentials: true  // <=========== important!
    });
  }
  getProductFeatured():any{
    const url = this.base + '/product_featured';
    return this.http.get(url, {
      withCredentials: true  // <=========== important!
    });
  }
  getProductById(id):any{
    const url = this.base + '/product_by_id/' + id;
    return this.http.get(url, {
      withCredentials: true  // <=========== important!
    });
  }

  getCities(data):any{
    // const url = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    return this.http.get(url, {params:{address:data, key: 'AIzaSyBjhqLY6nGyyahTf_DS2XJQ26TBjMTvUe8'},
      // <=========== important!
    });
  }
}
