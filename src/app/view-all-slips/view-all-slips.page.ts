import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-all-slips',
  templateUrl: './view-all-slips.page.html',
  styleUrls: ['./view-all-slips.page.scss'],
})
export class ViewAllSlipsPage implements OnInit {

  constructor(
    private db: AngularFirestore,
    private load: LoadingController,
    private toast: ToastController) { }

  ngOnInit() {
  }

}
