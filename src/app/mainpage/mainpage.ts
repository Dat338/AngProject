import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Category, Food } from '../models/food';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-mainpage',
  imports: [FormsModule, RouterModule],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  Take = 10;
  page = 1;
  maxPage = 5;
  spicelevel = 0;
  selectedCategory: string = '';
  selectedCategoryIds: number[] = [];
  rating = 0;
  minprice = 0;
  maxprice = 100;
  searchTerm = '';
  food: Food[] = [];
  categories: Category[] = [];

  plus() {
    this.page++;
    this.applyFilters();
  }

  minus() {
    if (this.page > 1) {
      this.page--;
      this.applyFilters();
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
}