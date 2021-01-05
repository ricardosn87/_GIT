import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Prodcut } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-prodcuts',
  templateUrl: './prodcuts.component.html',
  styleUrls: ['./prodcuts.component.css']
})
export class ProdcutsComponent implements OnInit {

  products$: Prodcut[]
  filterProducts$: Prodcut[]

  displayedColumns = ['name', 'price', 'stock', 'operations']

  @ViewChild('name') productName: ElementRef;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar) {
  }

  productForm = this.fb.group({
    id: [undefined],
    name: ['', [Validators.required]],
    stock: [0, [Validators.required]],
    price: [0, [Validators.required]]
  })

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        prod => this.products$ = prod.length > 0 ? prod : []
      )
  }

  onSubmit() {
    let p: Prodcut = this.productForm.value
    console.log(p)
    if (!p.id) {
      this.addProduct(p)
    } else {
      this.updateProduct(p)
    }
  }
  addProduct(p: Prodcut) {
    this.productService.addProduct(p)
      .then(() => {
        this.snackBar.open('Produto Adicionado', 'OK', { duration: 5000 })
        this.productForm.reset({ name: '', stock: '', price: 0, id: undefined })
        this.productName.nativeElement.focus()
      })
      .catch((err) => {
        console.log(err)
        this.snackBar.open('Erro ao Adcionar o Produto: ' + err, 'OK', { duration: 5000 })
      })
  }
  updateProduct(p: Prodcut) {
    this.productService.updateProduct(p)
      .then(
        () => {
          this.snackBar.open('Produto Atualizado', 'OK', { duration: 5000 })
          this.productForm.reset({ name: '', stock: '', price: 0, id: undefined })
          this.productName.nativeElement.focus()
        })
      .catch(() => {
        this.snackBar.open('Erro ao Atualizar o Produto', 'OK', { duration: 5000 })
      })
  }
  edit(p: Prodcut) {
    this.productForm.setValue(p)
  }
  del(p: Prodcut) {
    this.productService.deleteProduct(p)
      .then(
        () => {
          this.snackBar.open('Produto Excluído', 'OK', { duration: 5000 })
        })
      .catch(() => {
        this.snackBar.open('Erro ao Excluir o Produto', 'OK', { duration: 5000 })
      })
  }

  filter(event: any) {
     this.productService.searchByName(event.target.value).subscribe(
      prodfilter =>  this.filterProducts$ = prodfilter.length > 0 ? prodfilter : []
    )
  }
}
