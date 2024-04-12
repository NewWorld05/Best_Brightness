import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router:Router,private auth:AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  async log() {
    try {
      await this.auth.signInWithEmailAndPassword(this.email, this.password);
      this.presentToast('Logged in successfully');
      this.router.navigateByUrl('/main');
    } catch (error) {
      console.error(error); // Log the entire error object to inspect its structure
      this.presentToast('An error occurred during login'); // Display a generic error message
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

  move(){
    this.router.navigateByUrl('/reset');

  }

}
