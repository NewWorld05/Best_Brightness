import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model'; // Import the Item interface

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  store: any[] = []; // Initialize inventory array
  Inventory: any[] = [];


  constructor(private firestore: AngularFirestore) { }

  // getInventory(): Observable<any[]> {
  //   return this.firestore.collection('inventory').valueChanges();
  // }

  getInventory(): Observable<Item[]> {
    return this.firestore.collection<Item>('inventory', ref => ref.orderBy('date', 'desc')).valueChanges();
  }


  getStore(): Observable<Item[]> {
    return this.firestore.collection<Item>('store', ref => ref.orderBy('date', 'desc')).valueChanges();
  }
}
