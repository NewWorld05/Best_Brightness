import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  selectedItems: any[] = []; // Initialize array to hold selected items
  store: any[] = []; // Initialize inventory array

  constructor(private afDatabase: AngularFirestore) { }

  ngOnInit() {
    this.getSelectedItems();
    this.getInventory();
  }

  getSelectedItems() {
    // Query Firestore to get items where quantityToMove is not zero
    this.afDatabase.collection('store', ref => ref.where('quantityToMove', '>', 0))
      .valueChanges().subscribe((data: any[]) => {
        this.selectedItems = data;
      });
  }

  getInventory() {
    this.afDatabase.collection('store', ref => ref.orderBy('date', 'desc'))
      .valueChanges().subscribe((data: any[]) => {
        this.store = data;
      });
  }

}
