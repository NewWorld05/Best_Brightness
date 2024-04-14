import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  selectedUser: any;
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';

  constructor(private router:Router, private auth: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  reg() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        if (userCredential.user) {
          window.alert("Account created");
          this.presentToast('Account created successfully');
          this.router.navigateByUrl('/login');
        }
      })
      .catch((error) => {
        window.alert(error.message);
        this.presentToast('Registration unsuccessful');
      });

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

