import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productModel/product.model';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  total:  number = 0;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  private loadDataIntoTable(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.calculateTotal();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  private calculateTotal(): void {
    this.total = this.products.reduce((accumulated, currentValue) => {
      return accumulated + currentValue.price;
    }, 0);
  }
}
