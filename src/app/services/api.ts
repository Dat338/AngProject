import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor (private Mainapi : HttpClient) {

    }
      Mainurl = "https://restaurantapi.stepacademy.ge/api/"
      Apikey = "51b12ec8-cf9d-4833-a849-9f575bde4d44"

    api (url : string) {
      return this.Mainapi.get(this.Mainurl + url, {
        headers: {
          'X-API-KEY': `${this.Apikey}`
        }
      })
    }
    apipost (url : string, data : any) {
      return this.Mainapi.post(this.Mainurl + url, data, {
        headers: {
          'X-API-KEY': `${this.Apikey}`,
          'Content-Type': 'application/json',
        }
      })
    }
    apiput (url : string, data : any) {
      return this.Mainapi.put(this.Mainurl + url, data, {
        headers: {
          'X-API-KEY': `${this.Apikey}`,
          'Content-Type': 'application/json',
        }
      })
    }
   
}
