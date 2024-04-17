import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GoogleAuthProvider } from 'firebase/auth';

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
      window.alert('Logged in successfully');
      this.presentToast('Logged in successfully');
      this.router.navigateByUrl('/main');
    } catch (error) {
      console.error(error); // Log the entire error object to inspect its structure
      window.alert(error);
      this.presentToast('An error occurred during login - Please check your login details and try again'); // Display a generic error message
    }
  }

  // async loginWithGoogle() {
  //   try {
  //     const user = await this.authService.loginWithGoogle();
  //     // Handle successful login (e.g., navigate to another page)
  //     this.navCtrl.navigateForward('/dispatch');
  //     console.log('Logged in user:', user);
  //   } catch (err) {
  //     console.error('Login error:', err);
  //   }
  // }

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
