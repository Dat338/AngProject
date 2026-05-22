import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  http = inject(HttpClient)
  snackbar = inject(MatSnackBar)

  items: any[] = [];
  info: any[] = []
  totalprice : number = 0
  totalitems : number = 0
  hide = false
  addplease = ``


  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCart();
    console.log(this.info)
  }

  getCart() {
    this.api.api('cart').subscribe({
      next: (resp: any) => {
        this.items = resp.data.items;
        console.log(resp.data)
        this.totalprice = resp.data.totalPrice;
        this.totalitems = resp.data.totalItems
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  removeFromCart(itemId: number) {
    this.api.apidelete(`cart/remove-from-cart/${itemId}`).subscribe({
      next: () => {
        this.snackbar.open(`removed succesfully!`, `close`, {
          duration: 2000,
          panelClass: ['success-snackbar'],
      })
        this.getCart()
      },
      error: (err: any) => console.error(err),
    });
  }

  decreaseQuantity(itemId: number) {
  const item = this.items.find(x => x.id === itemId);

  if (!item || item.quantity <= 1) return;

  item.quantity--;

  this.api.apiput('cart/edit-quantity', {
    itemId,
    quantity: item.quantity
  }).subscribe({
    next: () => this.getCart(),
    error: (err) => {
      console.error(err);
      item.quantity++;
    }
  });
}

increaseQuantity(itemId: number) {
  const item = this.items.find(x => x.id === itemId);

  if (!item) return;

  item.quantity++;

  this.api.apiput('cart/edit-quantity', {
    itemId,
    quantity: item.quantity
  }).subscribe({
    next: () => this.getCart(),
    error: (err) => {
      console.error(err);
      item.quantity--;
    }
  });
}
checkout () {
  if(this.totalitems > 0) {
    this.api.apipost(`cart/checkout` , {})
  .subscribe({next : (resp : any) => {
    console.log(resp);
    this.getCart()
    this.hide = true
    this.addplease = `succesfuly bought!`
    this.http.post("https://whis017.app.n8n.cloud/webhook/kidva", {
  "email": localStorage.getItem('email')
}).subscribe({
  next: (resp) => console.log(resp),
  error: (err) => console.log(err)
})
  },
  error : (err : any) => {
    console.log(err);
  }})
  }
  else {
    this.addplease = `please add items to cart`
  }
}
link() {
  window.location.href = 'https://whis017.app.n8n.cloud/form/6e5903c5-6b26-403b-8c37-4646ff456235';
}
}