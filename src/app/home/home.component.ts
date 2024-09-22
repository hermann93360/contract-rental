import {Component} from '@angular/core';
import {Car, SpecificPeriod} from "../../model/Car";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BookingService} from "../../services/booking.service";
import {Time} from "@angular/common";
import {Route, Router} from "@angular/router";
import {CarPickerComponent} from "../car-picker/car-picker.component";
import {MatSelectModule} from "@angular/material/select";
import {Book} from "../../model/Book";
import {AppModule} from "../app.module";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datePickerForm: FormGroup;
  timeOfDates: { timeObject: Time, timeAsString: string }[];
  dateSet: SpecificPeriod | undefined;
  book: Book | undefined;

  constructor(private formBuilder: FormBuilder,
              private bookingService: BookingService,
              private sessionService: SessionService,
              private router: Router) {
    this.timeOfDates = this.getHoursInDay();
    this.datePickerForm = this.constructDateForm();

    this.sessionService.data.subscribe(bookingDate => {
      this.book = bookingDate;
      if(this.book.start && this.book.end){
        // this method set dateSet to help car-pickers component to search car with this date on input
        this.setDateToSearchCar(this.book.start, this.book.end)
        //in booking service this method going to initialize a list of available car and car-pickers component will call this list of cars
        this.bookingService.setAvailableCar(this.book.start, this.book.end);
      }
    })
  }

  private constructDateForm() {
    return this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['']
    });
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

    this.setDateToSearchCar(startDate, endDate)
    //in booking service this method going to initialize a list of available car and car-pickers component will call this list of cars
    this.bookingService.setAvailableCar(startDate, endDate);
    this.sessionService.chooseDate(startDate, endDate);
  }
  setDateToSearchCar(start: Date, end: Date) {
    this.dateSet = {start: start, end: end}
  }

  getHoursInDay() {
    let timeOfDates: { timeObject: Time, timeAsString: string }[] = []
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes+=30) {
        timeOfDates.push({
          timeObject: {hours: hours, minutes: minutes},
          timeAsString: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        })
      }
    }
    return timeOfDates;
  }



}
