import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  showFirstContent: boolean = true;
  somethingClicked: boolean = false;
  selectedDelivery: any;
  capturedPhotos: any[] = [];
  segmentValue: string = 'view';
  inventory: any[] = []; // Initialize with your inventory data
  expandedItem: any = null;
  selectedQuantity: number = 1;
  selectedSize: string = '';
  sizeOptions: string[] = [];
  quantityOptions: number[] = [];
  itemName: any;

  constructor(private afDatabase: AngularFirestore, private storage: AngularFireStorage) {
    this.afDatabase
      .collection('inventory') // Collection name consistent with your Firestore collection
      .valueChanges()
      .subscribe((inventory) => {
        this.inventory = inventory;
      });
  }

  ngOnInit() {}

  pickItem(delivery: any) {
    this.selectedDelivery = delivery;
    this.showFirstContent = false;
  }

  showSecondContent() {
    this.showFirstContent = false;
  }

  showFirstContentAgain() {
    this.showFirstContent = true;
  }

  updateQuantity() {
    const selectedItemId = this.selectedDelivery.id; // Assuming each item has a unique ID
    const newQuantity = this.selectedQuantity;

    this.afDatabase.collection('inventory').doc(selectedItemId).update({ quantity: newQuantity })
      .then(() => {
        console.log('Quantity updated successfully!');
        // Optionally, provide feedback to the user
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
        // Optionally, provide error feedback to the user
      });
  }

  submitQuantity() {
    // Here you can perform any actions you need when the user submits the quantity
    console.log('Submitted quantity:', this.selectedDelivery.quantity);
  
    // Retrieve the document reference(s) that match the query
    this.afDatabase.collection('inventory').ref
      .where('itemName', '==', this.selectedDelivery.itemName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Update each document with the new quantity
          doc.ref.update({
            quantity: this.selectedDelivery.quantity,
          }).then(() => {
            console.log('Product quantity updated successfully!');
            this.showFirstContent = true;
          }).catch((error) => {
            console.error('Error updating product quantity:', error);
          });
        });
      }).catch((error) => {
        console.error('Error querying documents:', error);
      });
  
    // Hide the content after submission if needed
    this.showFirstContent = false;
  }
}