import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private firestore: AngularFirestore) { }

  getInventory(): Observable<any[]> {
    return this.firestore.collection('inventory').valueChanges();
  }
}
