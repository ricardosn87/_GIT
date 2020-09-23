import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatTable } from "@angular/material/table";
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  @ViewChild(MatTable) datatable:MatTable<any>;

  products: Product[]

  prodColumns: string[] = ["id","name","departament","price","description"]

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productService.onNewProduct.subscribe((p) => {
      this.datatable.renderRows();
    })
  }

}
