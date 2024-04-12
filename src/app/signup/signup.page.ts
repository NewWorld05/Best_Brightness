import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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

  constructor(private router:Router, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  reg() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        if (userCredential.user) {
          window.alert("Account created");
          this.router.navigateByUrl('/login');
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });

    }


}

