import {Component, Input} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Car} from "../../model/Car";
import {CarDetailsComponent} from "../car-details/car-details.component";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-car-picker',
  templateUrl: './car-picker.component.html',
  styleUrl: './car-picker.component.scss'
})
export class CarPickerComponent {

  @Input()
  startDate: Date = new Date()

  @Input()
  endDate: Date = new Date()

  cars: Car[] = []

  constructor(private bookingService: BookingService,
              private sessionService: SessionService,
              private router: Router) {
    this.bookingService.sharedCars.subscribe((availableCar) => {
      this.cars = availableCar
      console.log(this.cars)
    })
  }

  selectCar(car: Car) {
    this.sessionService.chooseCar(car);
    this.router.navigate(['/car-details'])
  }


}
