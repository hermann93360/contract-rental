import { Component } from '@angular/core';
import {CheckoutComponent} from "../checkout/checkout.component";

@Component({
  selector: 'app-payment-data-settings',
  standalone: true,
  imports: [
    CheckoutComponent
  ],
  templateUrl: './payment-data-settings.component.html',
  styleUrl: './payment-data-settings.component.scss'
})
export class PaymentDataSettingsComponent {

  displayPaymentForm: boolean = false

  processPayment(status: {success: boolean, text: string}) {
    if(status.success){
      this.displayPaymentForm = false
    }
  }

  initPayment() {
    this.displayPaymentForm = true;
  }
}
