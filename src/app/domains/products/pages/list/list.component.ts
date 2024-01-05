import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '@product/components/product/product.component'
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from "@shared/components/header/header.component";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
    imports: [
      RouterLink,
      ProductComponent, 
      HeaderComponent
    ]
})
export default class ListComponent {

  products = signal<Product[]>([])
  categories = signal<Category[]>([])
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges() {
    this.getProducts()
  }


  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }      
    });
  }

  private getCategories() {
    this.categoryService.getAll()
    .subscribe({
      next: (category) => {
        this.categories.set(category);
      },
      error: () => {

      }      
    });
  }
}
