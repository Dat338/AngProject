import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Api } from '../services/api';
import { Category, Food } from '../models/food';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mainpage',
  imports: [FormsModule, RouterModule],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
  constructor(private api: Api, private cdr: ChangeDetectorRef) {}
  snackbar = inject(MatSnackBar)

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  Take = 10;
  page = 1;
  spicelevel = 0;
  selectedCategory: string = '';
  selectedCategoryIds: number[] = [];
  rating = 0;
  minprice = 0;
  maxprice = 100;
  searchTerm = '';
  food: Food[] = [];
  categories: Category[] = [];
  hasMore : boolean = false

  plus() {
    if (this.hasMore) {
    this.page++;
    this.applyFilters();
    this.cdr.detectChanges()
    }
  }

  minus() {
    if (this.page > 1) {
      this.page--;
      this.applyFilters();
      this.cdr.detectChanges()
    }
  }
  loadCategories() {
    this.api.api(`categories`).subscribe((resp: any) => {
      this.categories = resp.data;
      this.cdr.detectChanges();
    }, (err: any) => console.log(err));
  }

  loadProducts() {
    this.api
      .api(`products?Take=${this.Take}&Page=${this.page}`)
      .subscribe((resp: any) => {
        this.hasMore = resp.data.hasMore;
        this.food = resp.data.products;
        this.cdr.detectChanges();
      }, (err: any) => console.log(err));
  }

  toggleCategory(id: number, checked: boolean) {
    if (checked) {
      this.selectedCategoryIds.push(id);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(c => c !== id);
    }
    this.print();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedCategoryIds = [];
    this.spicelevel = 0;
    this.rating = 0;
    this.minprice = 0;
    this.maxprice = 100;
    this.print();
  }

  print() {
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    const havesearch = this.searchTerm.trim() !== '';
    const hasVegetarianFilter = this.selectedCategory !== '';
    const hasCategoryFilter = this.selectedCategoryIds.length > 0;
    const hasSpiceFilter = this.spicelevel > 0;
    const rateFilter = this.rating > 0;
    const hasPriceFilter = this.minprice > 0 || this.maxprice < 100;

    if (!havesearch && !hasVegetarianFilter && !hasCategoryFilter && !hasSpiceFilter && !rateFilter && !hasPriceFilter) {
      this.loadProducts();
      return;
    }

    let url = `products/filter?Take=${this.Take}&Page=${this.page}`;

    if (havesearch) {
      url += `&Query=${encodeURIComponent(this.searchTerm.trim())}`;
    }
    if (hasCategoryFilter) {
      this.selectedCategoryIds.forEach(id => url += `&CategoryId=${id}`);
    }
    if (hasVegetarianFilter) {
      url += `&Vegetarian=${this.selectedCategory}`;
    }
    if (hasSpiceFilter) {
      url += `&Spiciness=${this.spicelevel}`;
    }
    if (rateFilter) {
      url += `&Rate=${this.rating}`;
    }
    if (hasPriceFilter) {
      url += `&MinPrice=${this.minprice}&MaxPrice=${this.maxprice}`;
    }

    this.api.api(url).subscribe((resp: any) => {
      this.food = resp.data.products;
      this.cdr.detectChanges();
    }, (err: any) => console.log(err));
  }
  addtocart(event: any) {
    console.log(event.id)
    this.api.apipost(`cart/add-to-cart`, {
      productId : event.id,
      quantity : 1
    }).subscribe((resp: any) => {
      console.log(resp);
      this.snackbar.open(`added to cart!`, `close`, {
        panelClass: ['success-snackbar'],
        duration: 2000
      })
    }, (err: any) => {
      this.api.apiput(`cart/edit-quantity`, {
        productId : event.id,
        quantity : 1
      }).subscribe((resp: any) => {
        console.log(resp);
        this.snackbar.open(`added to cart!`, `close`, {
        duration: 2000,
        panelClass: ['success-snackbar'],
      })
      }, (err: any) => {
        console.log(err);
        this.snackbar.open(`Please Login`, `close`, {
        duration: 2000,
        panelClass: ['error-snackbar']
      })
      });
    });
    
  }
}