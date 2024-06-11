import {Component, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Stripe from 'stripe';
import {
  injectStripe,
  NgxStripeModule, StripeCardComponent,
  StripeCardNumberComponent,
  StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {StripeCardElementOptions, StripeElementsOptions, StripePaymentElementOptions} from "@stripe/stripe-js";
import {Observable} from "rxjs";
import {MoneyConverterUIPipe} from "../money-converter-ui.pipe";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    StripePaymentElementComponent,
    StripeElementsDirective,
    StripeCardNumberComponent,
    StripeCardComponent,
    MoneyConverterUIPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  @Input()
  name!: string

  @Input()
  email!: string

  @Input()
  zipCode!: string

  @Input()
  address!: string

  @Input()
  city!: string

  @Input()
  price!: number

  @Output()
  paymentStatus: EventEmitter<any> = new EventEmitter<any>()

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  stripe = injectStripe('pk_test_51OuaRSDexVtbuJLZavgmajD6zlt0vEq6uLDUCwu5Qectd4ohYRSGRYwQInKfHQ29O6cFV7FS5AMkAxTZJE5Kn8Ys00iw6ECKnl');

  paying = signal(false);


  constructor(private http: HttpClient) {
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        fontFamily: 'Roboto',
        fontSizeBase: '1rem',
        fontLineHeight: '1.5',
        borderRadius: '0',
        colorBackground: '#fff',
        focusBoxShadow: 'none',
        focusOutline: '-webkit-focus-ring-color auto 1px',
        tabIconSelectedColor: 'var(--colorText)'
      },
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
    }
  };

  ngOnInit() {
    this.createPaymentIntent({
      amount: this.price,
      currency: 'eur',
      email: this.email,
      name: this.name
    }).subscribe(response => {
        this.elementsOptions.clientSecret = response.clientSecret as string;
      });
  }

  pay() {
    this.paying.set(true);

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.name as string,
              email: this.email as string,
              address: {
                line1: this.address as string,
                postal_code: this.zipCode as string,
                city: this.city as string
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        if (result.error) {
          this.paymentStatus.emit({success: false, text: result.error.message})
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            this.paymentStatus.emit({success: true, text: 'succeeded'})
          }
        }
      });
  }

  private createPaymentIntent(param: { amount: any; currency: string; email: string, name: string }): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>('http://localhost:8080/init-payment', param);
  }
}
