import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractComponent } from './contract/contract.component';
import {NgOptimizedImage} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClauseComponent } from './clause/clause.component';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { SetContractComponent } from './set-contract/set-contract.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideFirebaseApp, getApp, initializeApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";



@NgModule({
  declarations: [
    AppComponent,
    ContractComponent,
    ClauseComponent,
    SignaturePadComponent,
    SetContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAf_jyIpNTDLhI04A7btalrIQgiUbXtZ9I",
      authDomain: "data-contract-471e4.firebaseapp.com",
      projectId: "data-contract-471e4",
      storageBucket: "data-contract-471e4.appspot.com",
      messagingSenderId: "367711629873",
      appId: "1:367711629873:web:95128f571727ee1aa89b10",
      measurementId: "G-6BXV6CX2HX"
    })),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAf_jyIpNTDLhI04A7btalrIQgiUbXtZ9I",
      authDomain: "data-contract-471e4.firebaseapp.com",
      projectId: "data-contract-471e4",
      storageBucket: "data-contract-471e4.appspot.com",
      messagingSenderId: "367711629873",
      appId: "1:367711629873:web:95128f571727ee1aa89b10",
      measurementId: "G-6BXV6CX2HX"
    }),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
