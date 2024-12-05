import {Component, Input} from '@angular/core';
import {Car} from "../../model/Car";
import {BookingService} from "../../services/booking.service";
import {Book} from "../../model/Book";
import {TotalPriceComponent} from "../elements/total-price/total-price.component";
import {Router, RouterLink} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {
  CarouselComponent, CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from "@coreui/angular";

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    TotalPriceComponent,
    CarouselIndicatorsComponent,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink
  ],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  car: Car | undefined
  currentBook: Book | undefined
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });


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


  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/img/angular.jpg'
    };
    this.slides[1] = {
      src: './assets/img/react.jpg'
    };
    this.slides[2] = {
      src: './assets/img/vue.jpg'
    };
  }


  goCarPickers() {
    this.router.navigate(["cars-picker"])
  }

  bookCar() {
    this.router.navigate(["car-booking"])
  }

  selectInsurance(insurance: string) {
    this.sessionBooking.chooseInsurance(insurance);
  }
}
