import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app'; // Import Firebase from 'firebase/compat/app' to access types

interface DeliverySlipData {
  employeeNumber: string;
  pickerName: string;
  // companyName: string;
  // contactNo: string;
  itemName: string;
  quantity: number;
  size: string;
  description: string;
  date: string;
  pickerSurname: string;
  
  current: firebase.firestore.Timestamp; // Use firebase.firestore.Timestamp for timestamp type
  capturedPhotosUrl: string;
}

@Component({
  selector: 'app-view-all-slips',
  templateUrl: './view-all-slips.page.html',
  styleUrls: ['./view-all-slips.page.scss'],
})
export class ViewAllSlipsPage implements OnInit {
  deliverySlipData: DeliverySlipData[] = [];

  constructor(
    private db: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.fetchDeliverySlipData(); // Fetch data on component initialization
  }

  async fetchDeliverySlipData() {
    try {
      const loader = await this.loadingCtrl.create({
        message: 'Loading...',
        spinner: 'crescent',
        duration: 4000,
        showBackdrop: true,
      });
      await loader.present();

      const isoDateTimeString = new Date().toISOString();
  
      // Fetch data from Firestore
      const querySnapshot = await this.db.collection('inventory').get().toPromise();
  
      this.deliverySlipData = []; // Clear previous data
      
      // Check if querySnapshot is defined before using it
      if (querySnapshot) {
        querySnapshot.docs.forEach(doc => {
          const data = doc.data() as DeliverySlipData;
          this.deliverySlipData.push(data);
        });
      }
  
      await loader.dismiss();
    } catch (error) {
      console.error('Error fetching delivery slip data:', error);
      this.showToast('Error fetching delivery slip data');
    }
  }
   

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  formatDate(timestamp: firebase.firestore.Timestamp): string {
    if (!timestamp) return ''; // Handle null or undefined timestamp
    const currentDate = timestamp.toDate();
    return `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  }
}
