import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from "@shared/pipes/reverse.pipe";
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [
      CommonModule, 
      ReversePipe, 
      TimeAgoPipe, 
      RouterLinkWithHref
    ]
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  @Output() addTocart = new EventEmitter();

  addToCartHandler() {
    console.log('click from child');
    this.addTocart.emit(this.product);
  }

}
