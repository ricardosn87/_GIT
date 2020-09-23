import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';
import { ProductsService } from './products.service';
import { Component } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { Product } from './product.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';

  simpleReqProductsObs$: Observable<Product[]>;
  productsErrorhandling: Product[]
  productsLoading: Product[]
  bLoading: boolean = false
  productsIds: Product[]
  newlyProducts: Product[] = []
  productsToDelete: Product[] = []
  productsToEdit: Product[] = []

  constructor(private produtcsService: ProductsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit() {

  }

  getSimpleHttpRequest() {
    this.simpleReqProductsObs$ = this.produtcsService.getProducts()
  }

  getProductsWithErrorHandling() {
    this.produtcsService.getProductsError()
      .subscribe((prods) => {
        this.productsErrorhandling = prods
      },
        (err) => {
          console.log(err)
          console.log('Message: ' + err.error.message)
          console.log('Status Code: ' + err.status)
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_error']

          if (err.status === 0)
            this.snackBar.open('Could not connect Server!', '', config);
          else this.snackBar.open(err.error.message, '', config);
        })
  }
  getProductsWithErrorHandlingOK() {
    this.produtcsService.getProductsDelay()
      .subscribe((prods) => {
        this.productsErrorhandling = prods
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok']
        this.snackBar.open('Success', '', config);

      },
        (err) => {
          console.log(err)
        })
  }

  getProductsLoading() {
    this.bLoading = true;
    this.produtcsService.getProductsDelay()
      .subscribe((prods) => {
        this.productsLoading = prods
        this.bLoading = false

      },
        (err) => {
          this.bLoading = false
          console.log(err)
        })
  }

  getProductsIds() {
    this.produtcsService.getProductsIds()
      .subscribe((ids) => {
        this.productsIds = ids.map(id => ({ _id: id, name: '', department: '', price: 0 }))
      })
  }

  loadName(id: string) {
    this.produtcsService.getProductName(id)
      .subscribe(
        (name) => {
          let index = this.productsIds.findIndex(p => p._id === id);
          if (index >= 0) {
            this.productsIds[index].name = name
          }
        }
      )
  }

  saveProduct(name: string, department: string, price: number) {
    let p = { name, department, price };
    this.produtcsService.saveProduct(p)
      .subscribe((p: Product) => {
        console.log(p)
        this.newlyProducts.push(p)
      },
        (err) => {
          console.log(err)
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_error']

          if (err.status === 0)
            this.snackBar.open('Could not connect Server!', '', config);
          else this.snackBar.open(err.error.message, '', config);
        })
  }

  loadProductsToDelete() {
    this.produtcsService.getProducts()
      .subscribe((prods) => this.productsToDelete = prods)
  }

  deleteProduct(p: Product) {
    this.produtcsService.deleteProduct(p)
      .subscribe(
        (res) => {
          let i = this.productsToDelete.findIndex(prod => prod._id == p._id)
          if (i >= 0) {
            this.productsToDelete.splice(i, 1)
            console.log(i)
          }
        },
        (err) => {
          console.log(err)
          let config = new MatSnackBarConfig();
          config.duration = 2000;
          config.panelClass = ['snack_error']

          if (err.status === 0)
            this.snackBar.open('Could not connect Server!', '', config);
          else this.snackBar.open(err.error.message, '', config);
        }
      )
  }

  loadProductsToEdit() {
    this.produtcsService.getProducts()
      .subscribe((prods) => this.productsToEdit = prods)
  }

  editProduct(p: Product) {
    let newProduct: Product = { ...p }
    let dialogRef = this.dialog.open(DialogEditProductComponent, { width: '400px', data: newProduct })
    dialogRef.afterClosed()
      .subscribe((res: Product) => {
        console.log(res)
        if (res) {
          this.produtcsService.editProduct(res)
            .subscribe((resp) => {
              let i = this.productsToEdit.findIndex(prod => prod._id == p._id)
              if (i >= 0) {
                this.productsToEdit[i] = resp
              }
              //this.loadProductsToEdit()
            },
              (err) => {
                console.error(err)

              })
        }
      })
  }
}
