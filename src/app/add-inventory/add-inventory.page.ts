import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private storage: AngularFireStorage
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
      })
  
    
    } catch (error) {
      console.log('Error saving inventory data:', error);
      // Handle specific errors accordingly
    }
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

}
