import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  constructor(private details : ActivatedRoute,
    private api : Api,
    private cdr : ChangeDetectorRef) {
  details.queryParams.subscribe(el => {
    this.selectedid = el['id'];
  });
  }
  snackbar = inject(MatSnackBar)
  ngOnInit() {
    this.api.api(`products/${this.selectedid}`).subscribe((resp : any) => {
      this.Product = resp.data;
      console.log(resp.data);
      this.cdr.detectChanges();
    });
  }

  selectedid! : number
  Product : any = [];
  activeTab = '';

setTab(tab: string) {
    if (this.activeTab === tab) {
    this.activeTab = '';
  } else {
    this.activeTab = tab;
  }
}
addtocart() {
  this.api.apipost(`cart/add-to-cart`, {
      productId : this.selectedid,
      quantity : 1
    }).subscribe((resp: any) => {
      console.log(resp);
    }, (err: any) => {
      this.api.apiput(`cart/edit-quantity`, {
        productId : this.selectedid,
        quantity : 1
      }).subscribe((resp: any) => {
        this.snackbar.open(`added to cart!`, `close`, {
          duration: 2000,
          panelClass: ['success-snackbar'],
        })
        console.log(resp);
      }, (err: any) => {
        this.snackbar.open(`please login`, `close`, {
          duration: 2000,
          panelClass: ['error-snackbar'],
        })
        console.log(err);
      });
    });
}
}
