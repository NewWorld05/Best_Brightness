import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import { QuerySnapshot } from '@angular/fire/compat/firestore';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, StyleDictionary, Style, Alignment } from 'pdfmake/interfaces';
import { TmplAstSwitchBlockCase } from '@angular/compiler';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {

  items: any[] = []; // Declare and initialize items array

  previewImage: string = '';

  inventory = {
    date: '',
    category: '',
    itemName: '',
    size: '',
    quantity: '',
    itemCode: '',
    status: ''
  };

  deliver = {
    name: '',
    surname: '',
    contact: '',
    employeeNumber: ''
  };

  imageUrl: any;

  constructor(
    private afDatabase: AngularFirestore,
    private storage: AngularFireStorage,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  clearItems() {
    this.inventory = {
      date: '',
      category: '',
      itemName: '',
      size: '',
      quantity: '',
      itemCode: '',
      status: ''
    };
    this.previewImage = '';
    this.imageUrl = '';
  }

  clear() {
    this.inventory = {
      date: '',
      category: '',
      itemName: '',
      size: '',
      quantity: '',
      itemCode: '',
      status: ''
    };
    this.deliver = {
      name: '',
      surname: '',
      contact: '',
      employeeNumber: ''
    };
    this.previewImage = '';
    this.imageUrl = '';
  }

  async addItem() {
    const imageUrl = await this.uploadImage(this.imageUrl); // Call uploadImage method to get image URL
    const newItem = {
      itemName: this.inventory.itemName,
      size: this.inventory.size,
      quantity: this.inventory.quantity,
      date: this.inventory.date,
      category: this.inventory.category,
      itemCode: this.inventory.itemCode,
      status: this.inventory.status,
      name: this.deliver.name,
      surname: this.deliver.surname,
      contact: this.deliver.contact,
      employeeNumber: this.deliver.employeeNumber,
      previewImage: this.previewImage,
      capturedPhotosUrl: imageUrl


      // Add other relevant item details as needed
    };
    this.items.push(newItem);
    this.clearItems();
  }

  async submit() {
    if (this.items.length > 0) {
      for (const item of this.items) {
        const querySnapshot = await this.afDatabase.firestore
          .collection('inventory')
          .where('itemName', '==', item.itemName)
          .where('size', '==', item.size)
          .get();

        if (!querySnapshot.empty) {
          // Item exists, update quantity
          const doc = querySnapshot.docs[0];
          const existingItem = doc.data();
          const newQuantity = existingItem['quantity'] + item.quantity;
          await doc.ref.update({ quantity: newQuantity });
        } else {
          // Item doesn't exist, add new document
          await this.afDatabase.collection('inventory').add(item);
        }
      }

      this.generateReceipt();
      this.presentToast('Items uploaded successfully');
      this.clear();
      this.items = []; // Clear items array
    } else {
      this.presentToast('No items to submit');
    }
  }

  generateReceipt() {
    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Delivery Receipt', style: 'header' },
        { text: `Delivery Person: ${this.deliver.name} ${this.deliver.surname}`, style: 'subheader' },
        { text: `Contact: ${this.deliver.contact}`, style: 'subheader' },
        { text: 'Items Delivered:', style: 'subheader', alignment: 'left' },
        ...this.generateItemList(), //Spread the array of items
        { text: `Remarks: ${this.inventory.status}`, style: 'subheader' },
        { text: 'Thank You!', style: 'footer', alignment: 'center' }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 20]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        footer: {
          fontSize: 18,
          bold: true,
          margin: [0, 50, 0, 0]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('Delivery_Receipt.pdf');
  }

  generateItemList() {
    const itemArray: string[] = [];
    this.items.forEach((item) => {
      itemArray.push(`${item.itemName}, Size: ${item.size}, Quantity: ${item.quantity}`);
    });
    return itemArray;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    this.previewImage = `data:image/jpeg;base64,${image.base64String}`;
    this.imageUrl = image.base64String;
  }

  async uploadImage(file: string) {
    const fileName = Date.now().toString();
    const filePath = `images/${fileName}`;
    const fileRef = this.storage.ref(filePath);

    const uploadTask = fileRef.putString(file, 'base64', {
      contentType: 'image/jpeg',
    });
    const snapshot = await uploadTask;

    return snapshot.ref.getDownloadURL();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }
}

  //items: any[] = []; // Declare and initialize items array

  // public imageSrc :any;
  // previewImage: string='';

  // inventory = {
  //   date: '',
  //   category: '',
  //   itemName: '',
  //   size: '',
  //   quantity: '',
  //   itemCode:'',
  //   status: ''
  // };

  // deliver = {
  //   name: '',
  //   surname: '',
  //   contact: '',
  //   employeeNumber: ''
  // };
  // imageUrl:any;
  

  // constructor(
  //   private afDatabase: AngularFirestore,
  //   private storage: AngularFireStorage,
  //   private toastController: ToastController
  // ) { }

  // ngOnInit() {
  // }

  // clear() {
  //   this.inventory = {
  //     date: '',
  //     category: '',
  //     itemName: '',
  //     size: '',
  //     quantity: '',
  //     itemCode:'',
  //     status:''
  //   };
  //   this.deliver = {
  //     name: '',
  //     surname: '',
  //     contact: '',
  //     employeeNumber: ''
  //   };
  //   this.previewImage = '';
  //   this.imageUrl = '';
  // };


  // addItem(){ //add new item to the array
  //   const newItem = {
  //     itemName: this.inventory.itemName,
  //     quantity: this.inventory.quantity,
  //     contact: this.deliver.contact,
  //   }
  //   this.items.push(newItem);
  //   //this.clearField();
  //   this.clear();
  // }

  // // clearField(){
  // //   this.inventory.quantity = '';
  // //   this.inventory.itemName = '';
  // //   this.deliver.contact ='';
  // // }

  // async submit() {
  //   try {
  //     const imageUrl = await this.uploadImage(this.imageUrl);

  //     // Create a valid ISO 8601 datetime string
  //     const isoDateTimeString = new Date().toISOString();
  
  //     await this.afDatabase.collection('inventory').add({
  //       date: isoDateTimeString, // Set the date property to the ISO 8601 datetime string
  //       category: this.inventory.category,
  //       itemName: this.inventory.itemName,
  //       size: this.inventory.size,
  //       quantity: this.inventory.quantity,
  //       deliverName: this.deliver.name,
  //       deliverSurname: this.deliver.surname,
  //       deliverContact: this.deliver.contact,
  //       employeeNumber: this.deliver.employeeNumber,
  //       capturedPhotosUrl: imageUrl,
  //       itemCode:this.inventory.itemCode
  //     }).then(() =>{
  // // Reset form after successful submission
  //     this.clear();
  //     console.log('SAVED SUCCESSFULLY'); // You might want to handle this differently in production
  //     window.alert("Saved Successfully");
  //     this.presentToast('Product was uploaded into the system successfully');
  //     })
  
    
  //   } catch (error) {
  //     console.log('Error saving inventory data:', error);
  //     window.alert("Product upload unsuccessful");
  //     this.presentToast('There is an error uploading the product into the system');
  //     // Handle specific errors accordingly
  //   }
  // }

  // async presentToast(message: string) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 5000, // Duration in milliseconds
  //     position: 'bottom' // Position of the toast
  //   });
  //   toast.present();
  // }



  
  //   /*async submit(){

  //     const Data = {
  //       date: this.inventory.date,
  //       category: this.inventory.category,
  //       itemName: this.inventory.itemName,
  //       size: this.inventory.size,
  //       quantity: this.inventory.quantity,
  //       pickerName: this.picker.name,
  //       pickerSurname: this.picker.surname,
  //       employeeNumber: this.picker.employeeNumber,
  
  //     };
  //     this.db.collection('deliveries').doc().set({Data}).then(() => {
  //       console.log("success");
  //     })
  
  //   }*/

  // async takePicture() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Base64

  //   });

  //   this.previewImage = `data:image/jpeg;base64,${image.base64String}`;
  //  this.imageUrl = image.base64String;
  //   //this.imageSrc = imageUrl;
  // };

  // async uploadImage(file: string) {
  //   const fileName = Date.now().toString();
  //   const filePath = `images/${fileName}`;
  //   const fileRef = this.storage.ref(filePath);

  //   const uploadTask = fileRef.putString(file, 'base64', {
  //     contentType: 'image/jpeg',
  //   });
  //   const snapshot = await uploadTask;

  //   return snapshot.ref.getDownloadURL();
  // }

  // generateReceipt() {
  //   const documentDefinition: TDocumentDefinitions = {
  //     content: [
  //       { text: 'Best Brightness', style: 'logo' },
  //       { text: 'Delivery Receipt', style: 'header' },
  //       { text: `Delivery Guy: ${this.deliver.name}`, style: 'subheader' },
  //       { text: `Contact: ${this.deliver.contact}`, style: 'subheader' },
  //       { text: 'Items Delivered:', style: 'subheader', alignment: 'left' },
  //       { text: `Remarks: ${this.inventory.status}`, style: 'subheader' }, // Assuming remarks come from inventory
  //       // this.generateItemList(),
  //       { text: 'Thank You!', style: 'footer', alignment: 'center' }
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 22,
  //         bold: true,
  //         alignment: 'center',
  //         margin: [0, 20, 0, 20]
  //       },
  //       subheader: {
  //         fontSize: 16,
  //         bold: true,
  //         margin: [0, 10, 0, 5]
  //       },
  //       footer: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 50, 0, 0]
  //       },
  //       logo: {
  //         fontSize: 24,
  //         bold: true,
  //         alignment: 'center',
  //         margin: [0, 50, 0, 20]
  //       }
  //     }
  //   };
  
  //   pdfMake.createPdf(documentDefinition).download('Best_Brightness_Delivery_Receipt.pdf');
  // }

  // generateItemList(items: any []{
  //   const itemArray = [];
  //   items.forEach((item) =>{
  //     itemArray.push({
  //       text: `${item.itemName}, Quantity: ${item.quality}`,
  //       margin: [0, 5, 0, 0],
  //       alignment: 'left',
  //     });
  //   });
  //   return itemArray;
  // });

  // // generateItemList() {
  // //   const itemArray = [];
  // //   this.items.forEach((item) => {
  // //     itemArray.push({
  // //       text: ` ${item.itemName}, Quantity: ${item.quantity}`,
  // //       margin: [0, 5, 0, 0],
  // //       alignment: 'left',
  // //     });
  // //   });
  // //   return itemArray;
  // // }
