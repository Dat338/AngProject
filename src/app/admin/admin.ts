import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  constructor(private api : Api, private cdr : ChangeDetectorRef) {
  }

  ngOnInit() {
    this.api.api("categories").subscribe({
      next : (next : any) => {
        console.log(next.data)
        this.array = next.data
        this.cdr.detectChanges()
      },
      error : (error : any) => {
        console.log(error)
      }
     }
    )
    this.api.api(`products?Take=${this.take}&Page=${this.page}`).subscribe({
      next : (next : any) => {
        this.hasMore = next.data.hasMore
        console.log(next.data.products)
        this.productsarr = next.data.products
        this.cdr.detectChanges()
      },
    error : (error : any) => console.log(error)    
  })
  }
  hasMore : boolean = false
  delbut = false
  hide = false
  editbut = false
  array : any = [] 
  productsarr : any = []
  ActiveTab = "categories"
  addtext = ``
  editingId : any = null
  product = false
  take = 10
  page = 1

 
  tab( rame : any) {
    this.ActiveTab = rame
  }
  addcategory(){
    this.api.apipost("categories", {
      name : this.addtext
    }).subscribe({next : (next : any) => {
        this.api.api("categories").subscribe({
      next : (next : any) => {
        console.log(next.data)
        this.array = next.data
        this.cdr.detectChanges()
      },
      error : (error : any) => {
        console.log(error)
      }
     }
    )
    },
      error : (error : any) => console.log(error)
    })
  }
  edit(id : any){ 
    this.editingId = this.editingId === id ? null : id;

    console.log(this.editingId)
  
  }
  save(id : any) {
    const rame = this.array.find((x : any) => x.id == id )
    console.log(rame)

    this.api.apiput(`categories/${id}`, {
      name : rame.name
    }).subscribe({
      next : (next : any) => console.log(next),
      error : (error : any) => console.log(error)
    })
  }
  showcategory() {
    this.hide = !this.hide
  }
  delete(id : any){
    this.api.apidelete(`categories/${id}`)
    .subscribe({next : (next : any) => {
      this.api.api("categories").subscribe({
      next : (next : any) => {
        console.log(next.data)
        this.array = next.data
        this.cdr.detectChanges()
      },
      error : (error : any) => {
        console.log(error)
      }
     }
    )
    },
      error : (error : any) => console.log(error)
    })
  }
  del(id : any) {
    this.delbut = !this.delbut
  }

  reload() {
this.api.api(`products?Take=${this.take}&Page=${this.page}`).subscribe({
      next : (next : any) => {
        this.hasMore = next.data.hasMore
        this.productsarr = next.data.products
        this.cdr.detectChanges()
      },
    error : (error : any) => console.log(error)    
  })
  }
  
plus (){
  this.page++
  this.reload()
}
min () {
  this.page--
  this.reload()
}
addprod() {
  this.product = !this.product
}

ingredients: string[] = [''];

addIngredient() {
  this.ingredients.push('');
}

removeIngredient(index: number) {
  this.ingredients.splice(index, 1);
}

submitProduct(form: NgForm) {
  if (form.invalid) return;

  const payload = {
    ...form.value,
    ingredients: this.ingredients.filter(i => i.trim() !== ''),
    vegetarian: !!form.value.vegetarian,
    spiciness: Number(form.value.spiciness),
    price: Number(form.value.price),
    categoryId: Number(form.value.categoryId),
  };

  this.api.apipost('products', payload).subscribe({
    next: () => {
      form.reset();
      this.reload();
      this.ingredients = [''];
    },
    error: (e) => console.log(e)
  });
}

editingProduct: any = null;
editIngredients: string[] = [''];

editprod(id: any) {
  this.api.api(`products/${id}`).subscribe({
    next: (next: any) => {
      this.editingProduct = { ...next.data };
      this.editIngredients = next.data.ingredients?.length
        ? [...next.data.ingredients]
        : [''];
        this.cdr.detectChanges()
    },
    error: (e) => console.log(e)
  });
}

closeEdit() {
  this.editingProduct = null;
  this.editIngredients = [''];
  this.cdr.detectChanges()
}

addEditIngredient() {
  this.editIngredients.push('');
  this.cdr.detectChanges()
  
}

removeEditIngredient(index: number) {
  this.editIngredients.splice(index, 1);
  this.cdr.detectChanges()
}

saveProduct(form: NgForm) {
  if (form.invalid) return;

  const payload = {
    ...this.editingProduct,
    ingredients: this.editIngredients.filter(i => i.trim() !== ''),
    vegetarian: !!this.editingProduct.vegetarian,
    spiciness: Number(this.editingProduct.spiciness),
    price: Number(this.editingProduct.price),
    categoryId: Number(this.editingProduct.categoryId),
  };

  this.api.apiput(`products/${this.editingProduct.id}`, payload).subscribe({
    next: () => {
      this.closeEdit();
      this.reload();
      this.cdr.detectChanges()
    },
    error: (e) => console.log(e)
  });
}
  
deleteproduct(id : any){
  this.api.apidelete(`products/${id}`)
  .subscribe({
    next : (next : any) => {
      this.reload()
    console.log(next)
    this.remprod = !this.remprod 
  },
    error: (error : any) => console.log(error)
  })
}
remprod = false
deletingProductId: any = null;

remvoeprod(id?: any) {
  this.deletingProductId = this.remprod ? null : id;
  this.remprod = !this.remprod;
}



}
