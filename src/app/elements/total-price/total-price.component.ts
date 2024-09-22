import {Component, Input} from '@angular/core';
import {BookingService} from "../../../services/booking.service";
import {SessionService} from "../../../services/session.service";

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


  constructor(public sessionService: SessionService) {

  }

}
