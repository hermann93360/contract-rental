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
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpClientModule} from "@angular/common/http";
import {ConfirmationComponent} from "./book/confirmation/confirmation.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import { provideNgxStripe } from 'ngx-stripe';
import {PaymentDataSettingsComponent} from "./payment-data-settings/payment-data-settings.component";
import {HomeComponent} from "./home/home.component";



@NgModule({
    declarations: [
        AppComponent,
        ContractComponent,
        ClauseComponent,
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
        HttpClientModule,
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
        MatProgressSpinnerModule,
        ConfirmationComponent,
        SignaturePadComponent,
        CheckoutComponent,
        PaymentDataSettingsComponent,
        HomeComponent,
    ],
    providers: [
      provideNgxStripe('pk_test_51OuaRSDexVtbuJLZavgmajD6zlt0vEq6uLDUCwu5Qectd4ohYRSGRYwQInKfHQ29O6cFV7FS5AMkAxTZJE5Kn8Ys00iw6ECKnl')
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
