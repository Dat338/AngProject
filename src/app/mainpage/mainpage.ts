import { Component } from '@angular/core';
import { Api } from '../services/api';
import { Header } from '../header/header';

@Component({
  selector: 'app-mainpage',
  imports: [],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
  constructor(private api : Api){}

  ngOnInit() {

    this.api.api("Car",).subscribe(resp => console.log(resp), err => console.log(err))
  }



}
