import {Component, Input} from '@angular/core';
import {BookingService} from "../../../services/booking.service";

@Component({
  selector: 'app-total-price',
  standalone: true,
  imports: [],
  templateUrl: './total-price.component.html',
  styleUrl: './total-price.component.scss'
})
export class TotalPriceComponent {

  @Input()
  price: number = 0;


  constructor(public bookingService: BookingService) {
    this.bookingService.progressBookingAsync.subscribe(book => {
      console.log(book.price)
      this.price = book.price!
    })
  }

}
