import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Api } from '../services/api';
import { Food } from '../models/food';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private api : Api, private cdr : ChangeDetectorRef) {}

  route = inject(Router)

  ngOnInit() {
    this.api.api('products/filter?Rate=4&Take=5&Page=1')
    .subscribe({
      next : (next:any) => {
        this.fivrated = next.data.products;
        this.cdr.detectChanges()
      },
      error : (err:any) => console.log(err)})
      this.api.api('products/filter?spiciness=3&Take=5&Page=1')
    .subscribe({
      next : (next:any) => {
        this.spiceness = next.data.products;
        this.cdr.detectChanges()
      },
      
        
      error : (err:any) => console.log(err)})
  }



  spiceness : Food | any = []
  fivrated : Food | any = []
}
