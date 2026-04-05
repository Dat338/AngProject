import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
    constructor (private Mainapi : HttpClient) {

    }
      Mainurl = "https://rentcar.stepprojects.ge/api/"

    api (url : string) {
      return this.Mainapi.get(this.Mainurl + url,)
    }
   
}
