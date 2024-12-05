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
  datePickerForm!: FormGroup;
  today = new Date("12/06/2024");
  startHours: SelectValue[] = []
  endHours: SelectValue[] = []


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
    this.startHours = this.getHoursInDay(0);
    this.endHours = this.getHoursInDay(0);
    this.buildForm();
    this.changeOnDates()
  }

  buildForm() {
    this.datePickerForm = this.formBuilder.group({
      startDate: [],
      endDate: [],
      startHour: [],
      endHour: [],
    })
  }

  changeOnDates() {
    this.datePickerForm.valueChanges.subscribe((value) => {
      console.log("je change ok")

      if(value.startDate && value.endDate) {
        console.log(this.today)
        const normalizedStartDateHandle = new Date(value.startDate.getFullYear(), value.startDate.getMonth(), value.startDate.getDate());
        const normalizedEndDateHandle = new Date(value.endDate.getFullYear(), value.endDate.getMonth(), value.endDate.getDate());
        const normalizedDateToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

        if(normalizedStartDateHandle.getTime() === normalizedDateToday.getTime()) {
          this.startHours = this.getHoursInDay(this.today.getHours());
        }

        if(normalizedEndDateHandle.getTime() === normalizedDateToday.getTime()) {
          this.endHours = this.getHoursInDay(this.today.getHours());
        }

        if(normalizedStartDateHandle.getTime() === normalizedEndDateHandle.getTime()) {
          if(value.startHour) {
            this.endHours = this.getHoursInDay(value.startHour.hours + 1)
          }
        }
      }

    })
  }

  getHoursInDay(filter?: number) {

    console.log(filter)
    let timeOfDates: SelectValue[] = []
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes+=30) {
        if(filter != undefined && hours >= filter) {
          timeOfDates.push({
            value: {hours: hours, minutes: minutes},
            display: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          })
        }

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

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    // Comparer avec aujourd'hui
    return date <= new Date();
  };

}
