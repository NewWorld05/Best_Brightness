import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {

  public imageSrc :any;
  previewImage: string='';

  inventory = {
    date: '',
    category: '',
    itemName: '',
    size: '',
    quantity: '',
    itemCode:''
  };

  picker = {
    name: '',
    surname: '',
    employeeNumber: ''
  };
  imageUrl:any;
  

  constructor(
    private afDatabase: AngularFirestore,
    private storage: AngularFireStorage,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  clear() {
    this.inventory = {
      date: '',
      category: '',
      itemName: '',
      size: '',
      quantity: '',
      itemCode:''
    };
    this.picker = {
      name: '',
      surname: '',
      employeeNumber: ''
    };
    this.previewImage = '';
    this.imageUrl = '';
  };

  async submit() {
    try {
      const imageUrl = await this.uploadImage(this.imageUrl);

      // Create a valid ISO 8601 datetime string
      const isoDateTimeString = new Date().toISOString();
  
      await this.afDatabase.collection('inventory').add({
        date: isoDateTimeString, // Set the date property to the ISO 8601 datetime string
        category: this.inventory.category,
        itemName: this.inventory.itemName,
        size: this.inventory.size,
        quantity: this.inventory.quantity,
        pickerName: this.picker.name,
        pickerSurname: this.picker.surname,
        employeeNumber: this.picker.employeeNumber,
        capturedPhotosUrl: imageUrl,
        itemCode:this.inventory.itemCode
      }).then(() =>{
  // Reset form after successful submission
      this.clear();
      console.log('SAVED SUCCESSFULLY'); // You might want to handle this differently in production
      window.alert("Saved Successfully");
      this.presentToast('Product was uploaded into the system successfully');
      })
  
    
    } catch (error) {
      console.log('Error saving inventory data:', error);
      window.alert("Product upload unsuccessful");
      this.presentToast('There is an error uploading the product into the system');
      // Handle specific errors accordingly
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



  
    /*async submit(){

      const Data = {
        date: this.inventory.date,
        category: this.inventory.category,
        itemName: this.inventory.itemName,
        size: this.inventory.size,
        quantity: this.inventory.quantity,
        pickerName: this.picker.name,
        pickerSurname: this.picker.surname,
        employeeNumber: this.picker.employeeNumber,
  
      };
      this.db.collection('deliveries').doc().set({Data}).then(() => {
        console.log("success");
      })
  
    }*/

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64

    });

    this.previewImage = `data:image/jpeg;base64,${image.base64String}`;
   this.imageUrl = image.base64String;
    //this.imageSrc = imageUrl;
  };

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

  generateReceipt() {
    const documentDefinition = {
      content: [
        { text: 'Best Brightness', style: 'logo' }, // Text for Best Brightness as logo
        { text: 'Delivery Receipt', style: 'header' },
        { text: Delivery Guy: ${this.deliveryGuy}, style: 'subheader' },
        { text: Contact: ${this.deliveryGuyContact}, style: 'subheader' },
        { text: 'Items Delivered:', style: 'subheader', alignment: 'center' }, // Center-align the items
        this.generateItemList(),
        { text: Remarks: ${this.remarks}, style: 'subheader' },
        { text: 'Thank You!', style: 'footer', alignment: 'center' } // Add "Thank You" message at the end
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 20] // Increase top margin
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        footer: {
          fontSize: 18,
          bold: true,
          margin: [0, 50, 0, 0] // Increase top margin
        },
        logo: {
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: [0, 50, 0, 20] // Top and bottom margin for the logo
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download('Best Brightness Delivery Receipt.pdf');
  }

}
