import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email: string = '';

  constructor(private auth:AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  async reset() {
    try {
      await this.auth.sendPasswordResetEmail(this.email);
      this.presentToast(`Reset email has been sent to ${this.email}`);
      this.email = '';
    } 
    catch (error) {
      console.error(error);
      this.presentToast('There an error with your email');
      this.email = '';

    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
    toast.present();
  }

}

