import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './models/product.model';
import { DepartamentService } from './departament.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private nextID: number

  onNewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  private dataFromServer: any[] = [{
    id: 1, name: "LapTop", departament_id: 4, price: 40, description: "description"
  },
  {
    id: 2, name: "Shirt", departament_id: 1, price: 10, description: "description"
  },
  {
    id: 3, name: "Polo", departament_id: 1, price: 10, description: "description"
  },
  {
    id: 4, name: "Mouse", departament_id: 3, price: 35, description: "description"
  },

  ]

  prodcuts: Product[] = []

  constructor(private departamentService: DepartamentService) {
    for (let p of this.dataFromServer) {
      this.prodcuts.push({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        departament: this.departamentService.getDepartamentById(p.id)
      })
      this.nextID = p.id + 1
    }
  }

  getProducts(): Product[] {
    return this.prodcuts;
  }

  addProduct(p: Product) {
    let prod: Product = { ...p, id: this.nextID++ }
    this.prodcuts.push(prod)
    console.log(this.prodcuts)
    this.onNewProduct.emit(prod)
  }
}
