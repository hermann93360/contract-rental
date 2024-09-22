import {Component, Input} from '@angular/core';
import {Car} from "../../model/Car";
import {BookingService} from "../../services/booking.service";
import {Book} from "../../model/Book";
import {TotalPriceComponent} from "../elements/total-price/total-price.component";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    TotalPriceComponent
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  car: Car | undefined
  currentBook: Book | undefined

  constructor(private bookingService: BookingService,
              private sessionBooking: SessionService,
              private router: Router) {

    this.currentBook = this.sessionBooking.bookingData;
    this.car = this.currentBook.car;
    console.log(this.currentBook);
    console.log(this.car);
    console.log(this.car?.getPremiumInsurancePrice(this.currentBook?.start!, this.currentBook?.end!, []));


    this.sessionBooking.data.subscribe(bookingData => {

    })
  }


  goCarPickers() {
    this.router.navigate(["home"])
  }

  bookCar() {
    this.router.navigate(["car-booking"])
  }

  selectInsurance(insurance: string) {
    this.sessionBooking.chooseInsurance(insurance);
  }
}
