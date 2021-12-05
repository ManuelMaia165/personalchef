import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const FirebaseConfig = {
  apiKey: "AIzaSyBCsicopD_P-XFM-wzoyz_-bbVf0UJxmvU",
  authDomain: "pweb-social-web.firebaseapp.com",
  projectId: "pweb-social-web",
  storageBucket: "pweb-social-web.appspot.com",
  messagingSenderId: "690201301493",
  appId: "1:690201301493:web:6df776531e129d4de410bc",
  measurementId: "G-2QBTHPRMZE"
}

@NgModule({
 declarations: [],
 imports: [
   CommonModule,
   AngularFireModule.initializeApp(FirebaseConfig),
   AngularFireAuthModule,
   AngularFireDatabaseModule
 ]
})

export class FirestoreModule{ }
