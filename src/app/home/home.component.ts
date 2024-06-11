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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    CarPickerComponent,
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datePickerForm: FormGroup;
  dateSet: SpecificPeriod | undefined;
  timeOfDates: { timeObject: Time, timeAsString: string }[] = []
  book: Book

  constructor(private formBuilder: FormBuilder,
              private bookingService: BookingService,
              private router: Router) {

    this.book = this.bookingService.getBook()
    if(this.book.start && this.book.end){
      this.displayAvailableCar(this.book.start, this.book.end)
    }
    this.datePickerForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['']
    });

    this.getHoursInDay()
  }

  getHourAndMin(hoursAndMin: string): Time {
    const [hour, minute] = hoursAndMin.split(':').map(Number);
    return {hours: hour, minutes: minute};
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

    this.bookingService.setAvailableCar(startDate, endDate);

    const book = this.bookingService.getBook();
    book.start = startDate
    book.end = endDate
    this.bookingService.patchBook(book);

    this.displayAvailableCar(startDate, endDate)
  }

  getHoursInDay() {
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes+=30) {
        this.timeOfDates.push({
          timeObject: {hours: hours, minutes: minutes},
          timeAsString: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        })
      }
    }
  }

  displayAvailableCar(start: Date, end: Date) {
    this.dateSet = {start: start, end: end}
  }

}
