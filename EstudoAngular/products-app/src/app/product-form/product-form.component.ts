import { Component, OnInit } from '@angular/core';
import { Departament } from '../models/departament.model';
import { ProductService } from '../product.service';
import { DepartamentService } from '../departament.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  name: string
  departament: Departament
  price: number
  description: string

  departaments: Departament[]

  constructor(
    private productService: ProductService,
    private departamentService: DepartamentService
  ) { }

  ngOnInit(): void {
    this.departaments = this.departamentService.getDepartament();
  }

  ID(): number {
    return Date.now();
  };

  save() {
    this.productService.addProduct({
      id: this.ID(),
      name: this.name,
      price: this.price,
      description: this.description,
      departament: this.departament
    })

    this.clear()
  }
  clear() {
    this.name = ""
    this.price = 0
    this.description = ""
    this.departament = null
  }

}
