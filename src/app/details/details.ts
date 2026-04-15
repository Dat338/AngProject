import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
}
