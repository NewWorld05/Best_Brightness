import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  inventory: any[] | undefined; // Variable to hold inventory data

  constructor(private afDatabase: AngularFirestore,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
   
    this.afDatabase
      .collection('inventory', (ref) => ref.orderBy('timestamp', 'desc'))
      .valueChanges({ idField: 'id' }) // Include idField to get document IDs
      .subscribe((data: any[]) => {
        this.inventory = data;
        this.filterInventory();
        console.log("nnn", this.inventory);
        
      })

      
  }

  filterInventory(){
    console.log("fghjkl;");
  }

  

}
