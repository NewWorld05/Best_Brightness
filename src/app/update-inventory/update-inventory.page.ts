import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.page.html',
  styleUrls: ['./update-inventory.page.scss'],
})
export class UpdateInventoryPage implements OnInit {

  inventoryData: any;
  itemCode: string =''; // Initialize itemCode

  constructor(
    private route: ActivatedRoute,
    private afDatabase: AngularFirestore,
    private storage: AngularFireStorage,
    private toastController: ToastController){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['itemCode']) {
        this.itemCode = params['itemCode'];
        this.getInventoryData(this.itemCode);
      }
    });
  }

  getInventoryData(itemCode: string) {
    this.afDatabase.collection('inventory').doc(itemCode).valueChanges().subscribe(data => {
      this.inventoryData = data;
    });
  }

  async submit() {
    try {
      // Update the inventory document in Firestore
      await this.afDatabase.collection('inventory').doc(this.itemCode).update({
        // Update fields with new values
        // Example:
        category: this.inventoryData.category,
        itemName: this.inventoryData.itemName,
        // Add other fields as needed
      });

      console.log('UPDATED SUCCESSFULLY');
      window.alert('Updated Successfully');
      this.presentToast('Product was updated successfully');
    } catch (error) {
      console.log('Error updating inventory data:', error);
      window.alert('Update unsuccessful');
      this.presentToast('There was an error updating the product');
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






// import { Component, OnInit, Renderer2 } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { finalize } from 'rxjs/operators';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
// import { LoadingController, NavController, ToastController } from '@ionic/angular';
// ///import { LoadingController, NavController, ToastController } from '@ionic/angular';

// @Component({
//   selector: 'app-update-inventory',
//   templateUrl: './update-inventory.page.html',
//   styleUrls: ['./update-inventory.page.scss'],
// })
// export class UpdateInventoryPage implements OnInit {
//   itemCode!: string; // Variable to hold the ID of the inventory item
//   itemName: string = '';
//   category: string = '';
//   size: string = '';
//   //itemDescription: string = '';
//   quantity: number = 0;
//   selectedFile: File | null = null;
//  // productInfor: any;
//   imageBase64: any;
//   toggleChecked: boolean = false;
//   imageUrl: any;
//   imageInfor:any;
//   newImage :any;

//   constructor(
//     private renderer: Renderer2,
//     private loadingController: LoadingController,
//     private route: ActivatedRoute,
//     private router: Router,
//     private firestore: AngularFirestore,
//     private fireStorage: AngularFireStorage
//   ) {
    
//   }

//   ngOnInit() {
//    // this.getPassedData();
//   }
  
//   hideCard() {
//     const cardElement = document.getElementById('container');
//     if (cardElement) {
//       this.renderer.setStyle(cardElement, 'display', 'none'); // Use Renderer2's setStyle()
//     }
//   }
// showCard() {
//     const cardElement = document.getElementById('container');
//     if (cardElement) {
//       this.renderer.setStyle(cardElement, 'display', 'contents'); // Use Renderer2's setStyle()
//     }
//   }
//   async closeScanner(){
//     this.showCard();
//     const result = await BarcodeScanner.stopScan(); // start scanning and wait for a result
//     // if the result has content
  
//     window.document.querySelector('ion-app')?.classList.remove('cameraView');
//     document.querySelector('body')?.classList.remove('scanner-active');
//   }

//   async scanBarcode() {
//     this.hideCard();
   
//     window.document.querySelector('ion-app')?.classList.add('cameraView');
//     document.querySelector('body')?.classList.add('scanner-active');
//     await BarcodeScanner.checkPermission({ force: true });
//     // make background of WebView transparent
//     // note: if you are using ionic this might not be enough, check below
//     //BarcodeScanner.hideBackground();
//     const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
//     // if the result has content
//     if (result.hasContent) {
//       this.itemCode = result.content;
//       console.log(result.content); // log the raw scanned content
//       this.showCard()
//       window.document.querySelector('ion-app')?.classList.remove('cameraView');
//       document.querySelector('body')?.classList.remove('scanner-active');
//     }
//   }

//   async deleteFileIfExists(url: string): Promise<void> {
//     if (url) {
//       try {
//         const fileRef = this.fireStorage.storage.refFromURL(url);
//         await fileRef.delete();
//       } catch (error) {
//         console.error('Error deleting file:', error);
//       }
//     }
//   }

// async updateItem() {

//   // if (this.imageBase64) {
//   //   await this.deleteFileIfExists.call(this, this.productInfor.imageUrl);
//   //   this.imageUrl = await this.uploadImage(this.imageBase64);
//   // } else {
//   //   // Keep the current URL if no new image is captured
//   //   this.imageUrl = this.productInfor.imageUrl;
//   // }

// const loader = await this.loadingController.create({
//   // message: 'Logging in...',
//   cssClass: 'custom-loader-class',
//   spinner:"dots"
// });
// await loader.present();
   
//     // Check if there's an existing item with the same name in the inventory collection
//     const existingItemQueryStore = await this.firestore
//       .collection('inventory')
//       .ref.where('itemCode', '==', this.itemCode)
//       .get();
//     if (!existingItemQueryStore.empty) {
//       // Update the quantity of the existing item in the storeroomInventory collection
//       const existingItemDoc = existingItemQueryStore.docs[0];
//       const existingItemData: any = existingItemDoc.data();
//       await existingItemDoc.ref.update({
//         name: this.itemName,
//         category: this.category,
//         //description: this.itemDescription,
//         itemCode:this.itemCode,
//         quantity: this.quantity,
//         timestamp: new Date(), 
//         imageUrl: this.imageUrl
      
//         // Add timestamp });
//         //console.log("Storeroom Inventory Updated (Plused)");
//       });
//       this.clearAllFields();
//       loader.dismiss();
//     }
//   }
//   clearAllFields() {
//     this.itemName = '';
//     this.category = '';
//     //this.itemDescription = '';
//     this.quantity = 0;
//     this.imageUrl = '';
//     this.newImage='';
//   }
//   // toggleMode() {
//   //   if (this.toggleChecked) {
//   //     this.barcode = ''; // Clear the barcode value when switching to input mode
//   //     BarcodeScanner.showBackground();
//   //     BarcodeScanner.stopScan();
//   //     document.querySelector('body')?.classList.remove('scanner-active'); 
//   //   }
//   //}
//   // clearFields() {
//   //   this.itemName = '';
//   //   this.category = '';
//   //   this.itemDescription = '';
//   //   this.quantity = 0;
//   //   this.selectedFile = null;
//   // }

//   onFileSelected(event: Event) {
//     const inputElement = event.target as HTMLInputElement;
//     if (inputElement.files) {
//       this.selectedFile = inputElement.files[0];
//     }
//   }

//   // async takePicture() {
//   //   const image = await Camera.getPhoto({
//   //     quality: 90,
//   //     allowEditing: false,
//   //     resultType: CameraResultType.Base64,
//   //     source: CameraSource.Camera,
//   //   });
//   //   this.imageBase64 = image.base64String;
//   //   this.newImage = `data:image/jpeg;base64,${image.base64String}`;
//   // }

//   // async uploadImage(file: string) {
//   //   const fileName = Date.now().toString();
//   //   const filePath = `images/${fileName}`;
//   //   const fileRef = this.fireStorage.ref(filePath);
//   //   const uploadTask = fileRef.putString(file, 'base64', {
//   //     contentType: 'image/jpeg',
//   //   });
//   //   const snapshot = await uploadTask;
//   //   return snapshot.ref.getDownloadURL();
//   // }

//   // async getPassedData() {
//   //   if (this.router.getCurrentNavigation()?.extras.state) {
//   //     this.productInfor = await this.router.getCurrentNavigation()?.extras.state;
//   //     console.log(this.productInfor);
//   //     this.barcode = this.productInfor.barcode; // Variable to hold the ID of the inventory item
//   //     this.itemName = this.productInfor.name;
//   //     this.itemCategory = this.productInfor.category;
//   //     this.itemDescription = this.productInfor.description;
//   //     this.itemQuantity = this.productInfor.quantity;
//   //     this.newImage = this.productInfor.imageUrl;
//   //   this.imageUrl =this.productInfor.imageUrl
//   //   }
//   // }

//   takePicture(){}
// }



