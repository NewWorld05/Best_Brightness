import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {

  public imageSrc :any;

  inventory = {
    date: '',
    category: '',
    itemName: '',
    size: '',
    quantity: ''
  };

  picker = {
    name: '',
    surname: '',
    employeeNumber: ''
  };

  

  constructor() { }

  ngOnInit() {
  }

  clear(){
    this.inventory.date = '',
    this.inventory.category = '',
    this.inventory.itemName = '',
    this.inventory.size = '',
    this.inventory.quantity = '',
    this.picker.name = '',
    this.picker.surname = '',
    this.picker.employeeNumber = ''
  };

  submit(){/*
    // Save inventory data to Firestore
      this.afDatabase.list('inventory').push({
        date: this.inventory.date,
        category: this.inventory.category,
        itemName: this.inventory.itemName,
        size: this.inventory.size,
        quantity: this.inventory.quantity,
        pickerName: this.picker.name,
        pickerSurname: this.picker.surname,
        employeeNumber: this.picker.employeeNumber
      }).then(() => {
        // Reset form after successful submission
      clear();
      })
      .catch(error => {
        console.log('Error saving inventory data:', error);
      });
    */}
  
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
      resultType: CameraResultType.Uri

    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl;
  };

}
