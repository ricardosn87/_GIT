import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Prodcut } from './models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Prodcut> = this.afs.collection('products')

  constructor(private afs: AngularFirestore,
    private db: AngularFireDatabase) { }

  // getProducts(): Observable<Prodcut[]> {
    getProducts() {
    /* 1 - forma */
    /* return this.productsCollection.valueChanges(); */
    return this.db.list('products')
     .snapshotChanges()
     .pipe(
       map(ch=>{
         return ch.map(c=> ({ id: c.payload.key,...c.payload.val() as Prodcut}))
       })
     )

  }

  addProduct(p: Prodcut) {
    /* 1 forma */
    /* const id = this.afs.createId()
    p.id = id
    return this.productsCollection.doc(p.id).set(p); */

    /* 2 forma */
    /* return this.productsCollection.add(p) */

    /* 3 forma */
    return this.db.list('products').push(p);
  }

  deleteProduct(p: Prodcut) {
    /* 1 forma */
    /* return this.productsCollection.doc(p.id).delete() */
    /* 2 forma */
    return this.db.object(`products/${p.id}`).remove()
  }

  updateProduct(p: Prodcut) {
    /* 1 - forma */
    /* return this.productsCollection.doc(p.id).set(p) */

    /* 2 - forma */
    return this.db.list('products').update(p.id == null ? '' : p.id, p);
  }

  searchByName(name: string): Observable<Prodcut[]> {
    return this.afs.collection<Prodcut>('products',
      ref => ref.orderBy('name').startAt(name).endAt(name + "\uf8ff"))
      .valueChanges()
  }
}
