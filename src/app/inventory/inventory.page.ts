import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  inventory: any[] = []; // Initialize inventory array
  quantityToMove: number = 0; // Declare quantityToMove variable
  

  constructor(private afDatabase: AngularFirestore,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getInventory();
  }

  /*getInventory() {
   
    this.afDatabase
      .collection('inventory', (ref) => ref.orderBy('timestamp', 'desc'))
      .valueChanges({ idField: 'id' }) // Include idField to get document IDs
      .subscribe((data: any[]) => {
        this.inventory = data;
        this.filterInventory();
        console.log("nnn", this.inventory);
        
      })

      
  }

  getInventory(){
    this.afDatabase.collection('inventory', ref => ref.orderBy('timestamp','desc'))
    .valueChanges().subscribe((data: any[]) => {
      this.inventory = data;
      this.filterInventory();
    });
    
  }

  filterInventory(){
    console.log("fghjkl;");
  }
  */

  getInventory() {
    this.afDatabase.collection('inventory', ref => ref.orderBy('date', 'desc'))
      .valueChanges().subscribe((data: any[]) => {
        this.inventory = data;
      });

  }

  moveItemToShop(item: any, quantityToMove: number) {
    if (quantityToMove <= item.quantity && quantityToMove > 0) {
      const confirmMove = confirm(`Do you want to move ${quantityToMove} ${item.itemName} to the shop?`);
      if (confirmMove) {
        // Update inventory in Firestore
        this.afDatabase.collection('inventory').doc(item.id).update({
          quantity: item.quantity - quantityToMove // Decrease quantity by the selected amount
        }).then(() => {
          console.log(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
        }).catch(error => {
          console.error('Error moving item to the shop:', error);
        });
      }
    } else {
      alert('Invalid quantity. Please enter a valid quantity to move.');
    }
  }
  
  

}
