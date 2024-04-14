import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  inventory: any[] = []; // Initialize inventory array
  quantityToMove: number = 0; // Initialize quantityToMove variable

  constructor(private afDatabase: AngularFirestore, private toastController: ToastController) { }

  ngOnInit() {
    this.getInventory();
    
  }

  getInventory() {
    this.afDatabase.collection('inventory', ref => ref.orderBy('date', 'desc'))
      .valueChanges().subscribe((data: any[]) => {
        this.inventory = data;
      });
  }

// Modify your moveItemToShop function to include Firestore query
moveItemToShop(item: any, quantityToMove: number) {
  if (quantityToMove <= item.quantity && quantityToMove > 0) {
    const confirmMove = confirm(`Do you want to move ${quantityToMove} ${item.itemName} to the shop?`);
    if (confirmMove) {
      // Query Firestore to get the document ID where itemCome is equal to "mike"
      this.afDatabase.collection('inventory', ref => ref.where('itemCode', '==', item.itemCode)).get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Use the retrieved document ID to update the inventory
          this.afDatabase.collection('inventory').doc(doc.id).update({
            quantity: item.quantity - quantityToMove // Decrease quantity by the selected amount
          })
          .then(() => {
            //console.log(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
            window.alert(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
            this.presentToast(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
          })
          .catch(error => {
            console.error('Error moving item to the shop:', error);
            
          });
        });
      });





      // this.afDatabase.collection('store', ref => ref.where('itemCode', '==', item.itemCode)).get().subscribe(querySnapshot => {
      //   querySnapshot.forEach(doc => {
      //     // Use the retrieved document ID to update the inventory
      //     this.afDatabase.collection('store').doc(doc.id).update({
      //       quantity: item.quantity + quantityToMove // Decrease quantity by the selected amount
      //     }).then(() => {
      //       console.log(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
      //     }).catch(error => {
      //       console.error('Error moving item to the shop:', error);


            
      //     });
      //   });
      // });






      this.afDatabase.collection('store', ref => ref.where('itemCode', '==', item.itemCode)).get().subscribe(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc: any) => {
            const existingQuantity = doc.data().quantity; // Access quantity directly from doc.data()
            // Use the retrieved document ID to update the quantity in the store
            this.afDatabase.collection('store').doc(doc.id).update({
              quantity: existingQuantity + quantityToMove // Add the new quantity to the existing quantity
            })
            .then(() => {
             // console.log(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
             window.alert(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
              this.presentToast(`${quantityToMove} ${item.itemName} moved to the shop successfully`);
            })
            .catch(error => {
              console.error('Error moving item to the shop:', error);
              
            });
          });
        } else {

            // If no document exists with the provided itemCode, add a new document to the store collection
            this.afDatabase.collection('store').add({
              date: item.date, // Set the date property to the ISO 8601 datetime string
              category: item.category,
              itemName: item.itemName,
              size: item.size,
              quantity: item.quantityToMove,
              pickerName: item.pickerName,
              pickerSurname: item.pickerSurname,
              employeeNumber: item.employeeNumber,
              capturedPhotosUrl: item.capturedPhotosUrl,
              itemCode: item.itemCode
            })
            .then(() => {
             // console.log(`${quantityToMove} ${item.itemName} added to the store successfully`);
             window.alert(`${quantityToMove} ${item.itemName} added to the store successfully`);
              this.presentToast(`${quantityToMove} ${item.itemName} added to the store successfully`);
            })
            .catch(error => {
              console.error('Error adding item to the store:', error);
              
            });
         
        }
      });
      


    }

    
  } else {
   // alert('Invalid quantity. Please enter a valid quantity to move.');
    this.presentToast('Invalid quantity. Please enter a valid quantity to move.');
  }
}



async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 5000, // Duration in milliseconds
    position: 'bottom' // Position of the toast
  });
  toast.present();
}



}


// import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-inventory',
//   templateUrl: './inventory.page.html',
//   styleUrls: ['./inventory.page.scss'],
// })
// export class InventoryPage implements OnInit {

//   inventory: any[] = []; // Initialize inventory array
//   selectedItems: any[] = []; // Array to store selected items

//   constructor(private afDatabase: AngularFirestore, private router: Router,
//     private storage: AngularFireStorage) { }

//   ngOnInit() {
//     this.getInventory();
//   }

//   /*getInventory() {
   
//     this.afDatabase
//       .collection('inventory', (ref) => ref.orderBy('timestamp', 'desc'))
//       .valueChanges({ idField: 'id' }) // Include idField to get document IDs
//       .subscribe((data: any[]) => {
//         this.inventory = data;
//         this.filterInventory();
//         console.log("nnn", this.inventory);
        
//       })

      
//   }

//   getInventory(){
//     this.afDatabase.collection('inventory', ref => ref.orderBy('timestamp','desc'))
//     .valueChanges().subscribe((data: any[]) => {
//       this.inventory = data;
//       this.filterInventory();
//     });
    
//   }

//   filterInventory(){
//     console.log("fghjkl;");
//   }
//   */

//   getInventory() {
//     this.afDatabase.collection('inventory', ref => ref.orderBy('date', 'desc'))
//       .valueChanges().subscribe((data: any[]) => {
//         this.inventory = data;
//       });

//   }

//   selectItem(item: any) {
//     if (this.selectedItems.includes(item)) {
//       // Deselect item if already selected
//       this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
//     } else {
//       // Select item if not already selected
//       this.selectedItems.push(item);
//     }
//   }

//   /*moveToShop() {
//     // Move selected items to the shop
//     for (const item of this.selectedItems) {
//       // Update inventory in Firestore
//       this.afDatabase.collection('inventory').doc(item.id).update({
//         quantity: item.quantity - item.quantityToMove // Decrease quantity by the selected amount
//       })
//       .then(() => {
//         console.log(`${item.quantityToMove} ${item.itemName} moved to the shop successfully`);
//         // Navigate to 'Items Moved to Shop' page after moving items
//         this.router.navigateByUrl('/items-moved-to-shop');
//       })
//       .catch(error => {
//         console.error('Error moving item to the shop:', error);
//       });
//     }

//   }*/

//   /*moveToShop() {
//     for (const item of this.selectedItems) {
//       if (item.quantityToMove <= item.quantity && item.quantityToMove > 0) {
//         const confirmMove = confirm(`Do you want to move ${item.quantityToMove} ${item.itemName} to the shop?`);
//         if (confirmMove) {
//           const docRef = this.afDatabase.collection('inventory').doc(item.id);
//           docRef.ref.get().then(doc => {
//             if (doc.exists) {
//               docRef.update({
//                 quantity: item.quantity - item.quantityToMove
//               }).then(() => {
//                 console.log(`${item.quantityToMove} ${item.itemName} moved to the shop successfully`);
//                 this.router.navigateByUrl('/items-moved-to-shop');
//               }).catch(error => {
//                 console.error('Error moving item to the shop:', error);
//               });
//             } else {
//               console.error('Document does not exist:', item.id);
//             }
//           }).catch(error => {
//             console.error('Error getting document:', error);
//           });
//         }
//       } else {
//         alert('Invalid quantity. Please enter a valid quantity to move.');
//       }
//     }
//   }*/
  
//   moveToShop() {
//     const itemsToUpdate = [];
  
//     // Check if any items are selected
//     if (this.selectedItems.length === 0) {
//       alert('Please select at least one item to move to the shop.');
//       return;
//     }
  
//     // Validate quantity to move for each selected item
//     for (const item of this.selectedItems) {
//       if (!(item.quantityToMove <= item.quantity && item.quantityToMove > 0)) {
//         alert(`Invalid quantity for ${item.itemName}. Please enter a valid quantity to move.`);
//         return;
//       }
//       itemsToUpdate.push({ id: item.id, quantity: item.quantity - item.quantityToMove });
//     }
  
//     // Confirm move for all selected items
//     const confirmMove = confirm(`Do you want to move ${this.selectedItems.length} items to the shop?`);
//     if (!confirmMove) return;
  
//     // Update quantity for all selected items
//     for (const item of itemsToUpdate) {
//       const docRef = this.afDatabase.collection('inventory').doc(item.id);
//       docRef.ref.get().then(doc => {
//         if (doc.exists) {
//           docRef.update({ quantity: item.quantity })
//             .then(() => console.log(`Item ${item.id} moved to the shop successfully`))
//             .catch(error => console.error('Error moving item to the shop:', error));
//         } else {
//           console.error('Document does not exist:', item.id);
//         }
//       }).catch(error => {
//         console.error('Error getting document:', error);
//       });
//     }
  
//     // Navigate to 'Items Moved to Shop' page after moving items
//     this.router.navigateByUrl('/items-moved-to-shop');
//   }
  
  

// }
