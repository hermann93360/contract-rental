import {Component, Input} from '@angular/core';
import {Car} from "../../model/Car";
import {BookingService} from "../../services/booking.service";
import {Book} from "../../model/Book";
import {TotalPriceComponent} from "../elements/total-price/total-price.component";
import {Router} from "@angular/router";

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

  car: Car
  currentBook: Book

  constructor(private bookingService: BookingService,
              private router: Router) {
    this.currentBook = this.bookingService.getBook()
    this.car = this.currentBook.car!;
  }


  goCarPickers() {
    this.router.navigate(["home"])
  }

  bookCar() {
    this.router.navigate(["car-booking"])
  }
}
