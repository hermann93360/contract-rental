import {Component, Input} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Car} from "../../model/Car";
import {CarDetailsComponent} from "../car-details/car-details.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-picker',
  standalone: true,
  imports: [
    CarDetailsComponent
  ],
  templateUrl: './car-picker.component.html',
  styleUrl: './car-picker.component.scss'
})
export class CarPickerComponent {

  @Input()
  startDate: Date = new Date()

  @Input()
  endDate: Date = new Date()

  cars: Car[] = []
  carSelect: Car | undefined = undefined;

  constructor(private bookingService: BookingService,
              private router: Router) {
    this.bookingService.sharedCars.subscribe((availableCar) => {
      this.cars = availableCar
      console.log(this.cars)
    })
  }

  selectCar(car: Car) {
    const book = this.bookingService.getBook();
    book.car = car
    book.price = car.getTotalPrice(this.startDate, this.endDate, [])
    this.bookingService.patchBook(book)
    this.carSelect = car;
    this.router.navigate(['/car-details'])
  }


}
