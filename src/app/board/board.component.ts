import { Component } from '@angular/core';
import {AppModule} from "../app.module";
import {InputComponent, SelectValue} from "../elements/input/input.component";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Time} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BookingService} from "../../services/booking.service";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  title = 'ng-carousel-demo';
  hours: SelectValue[] = []
  datePickerForm!: FormGroup;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<span class="material-symbols-outlined">arrow_back_ios_new</span>',
      '<span class="material-symbols-outlined">arrow_forward_ios</span>',
    ],
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  commentOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<span class="material-symbols-outlined">arrow_back_ios_new</span>',
      '<span class="material-symbols-outlined">arrow_forward_ios</span>',
    ],
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  slides = [
    { id: "1", img: "assets/images/Manycar_28-04-2024-41.jpg" },
    { id: "2", img: "assets/images/Manycar_28-04-2024-7.jpg" },
    { id: "3", img: "assets/images/Manycar_28-04-2024-8.jpg" },
    { id: "4", img: "assets/images/Manycar_28-04-2024-30.jpg" },
    { id: "5", img: "assets/images/Manycar_28-04-2024-9.jpg" }
  ];

  comments = [
    { id: "1", img: "assets/images/Manycar_28-04-2024-41.jpg" },
    { id: "2", img: "assets/images/Manycar_28-04-2024-7.jpg" },
    { id: "3", img: "assets/images/Manycar_28-04-2024-8.jpg" },
    { id: "4", img: "assets/images/Manycar_28-04-2024-30.jpg" },
    { id: "5", img: "assets/images/Manycar_28-04-2024-9.jpg" }
  ];


  constructor(private formBuilder: FormBuilder,
              private bookingService: BookingService,
              private sessionService: SessionService,
              private router: Router) {
    this.hours = this.getHoursInDay();
    this.buildForm();
  }

  buildForm() {
    this.datePickerForm = this.formBuilder.group({
      startDate: [],
      endDate: [],
      startHour: [],
      endHour: [],
    })
  }

  getHoursInDay() {
    let timeOfDates: SelectValue[] = []
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes+=30) {
        timeOfDates.push({
          value: {hours: hours, minutes: minutes},
          display: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        })
      }
    }
    return timeOfDates;
  }


  searchAvailableCars() {
    if (!this.datePickerForm.valid) {
      throw new Error()
    }

    const datesValue = this.datePickerForm.value;

    const startDate = datesValue['startDate'];
    const startHourAndMin = datesValue['startHour'];
    startDate.setHours(startHourAndMin.hours, startHourAndMin.minutes)


    const endDate = datesValue['endDate'];
    const endHourAndMin = datesValue['endHour'];
    endDate.setHours(endHourAndMin.hours, endHourAndMin.minutes)
    console.log(endDate)
    console.log(startDate)
    console.log(endHourAndMin)
    console.log(startHourAndMin)
    console.log(startDate)

    if(endDate < startDate) {
      throw new Error()
    }

    //in booking service this method going to initialize a list of available car and car-pickers component will call this list of cars
    this.bookingService.setAvailableCar(startDate, endDate);
    console.log(startDate)

    this.sessionService.chooseDate(startDate, endDate, startHourAndMin, endHourAndMin);
    this.router.navigate(['cars-picker'])
  }

}
