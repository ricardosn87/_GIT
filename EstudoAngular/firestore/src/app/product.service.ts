import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Prodcut } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Prodcut> = this.afs.collection('products')

  constructor(private afs: AngularFirestore) { }

  getProducts(): Observable<Prodcut[]> {
    return this.productsCollection.valueChanges();
  }

  addProduct(p: Prodcut) {
    const id = this.afs.createId()
    p.id = id
    return this.productsCollection.doc(p.id).set(p);
    //return this.productsCollection.add(p)
  }

  deleteProduct(p: Prodcut) {
    return this.productsCollection.doc(p.id).delete()
  }

  updateProduct(p: Prodcut) {
    return this.productsCollection.doc(p.id).set(p)
  }

  searchByName(name: string): Observable<Prodcut[]> {
    return this.afs.collection<Prodcut>('products',
      ref => ref.orderBy('name').startAt(name).endAt(name + "\uf8ff"))
      .valueChanges()
  }
}
