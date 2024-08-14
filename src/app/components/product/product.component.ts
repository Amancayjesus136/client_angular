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
  total: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  maxVisiblePages: number = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadDataIntoTable();
  }

  private loadDataIntoTable(): void {
    this.productService.getProducts(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        this.products = response.data;
        this.total = response.total;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadDataIntoTable();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.itemsPerPage);
  }

  generatePageLinks(): number[] {
    const maxLeft = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const maxRight = Math.min(this.totalPages, this.currentPage + Math.floor(this.maxVisiblePages / 2));

    const pageNumbers = [];
    for (let i = maxLeft; i <= maxRight; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }
}
