import {AfterViewInit, ApplicationRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {Car} from "../../model/Car";
import {CarDetailsComponent} from "../car-details/car-details.component";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session.service";
import {filter} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SelectValue} from "../elements/input/input.component";
import {Time, ViewportScroller} from "@angular/common";
import firebase from "firebase/compat";

@Component({
  selector: 'app-car-picker',
  templateUrl: './car-picker.component.html',
  styleUrl: './car-picker.component.scss'
})
export class CarPickerComponent implements OnInit, AfterViewInit {

  startDate: Date = new Date();
  endDate: Date = new Date();
  startHour!: Time
  endHour!: Time
  cars: Car[] = []
  datePickerForm!: FormGroup;
  hours: SelectValue[] = []
  @ViewChild('carsContainer', {static: false})
  carsContainer!: ElementRef;
  scroll = true;


  constructor(private bookingService: BookingService,
              private sessionService: SessionService,
              private router: Router,
              private formBuilder: FormBuilder,
              private viewportScroller: ViewportScroller,
              private appRef: ApplicationRef,
              private zone: NgZone) {
    this.hours = this.getHoursInDay();
    this.buildForm()
  }

  ngAfterViewInit(): void {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable && this.scroll) {
        this.scroll = false
        this.scrollToCarsContainer();
      }
    })

  }


  private scrollToCarsContainer() {
    const element = this.carsContainer.nativeElement;

    // Calcule la position exacte de l'élément par rapport au sommet du document
    const elementPosition = element.getBoundingClientRect().top + window.scrollY - 100;

    // Défile jusqu'à cette position pour aligner l'élément avec le haut de la page
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth', // Scrolling fluide
    });
  }

  buildForm() {
    this.datePickerForm = this.formBuilder.group({
      startDate: [],
      endDate: [],
      startHour: [],
      endHour: [],
    })
  }

  async ngOnInit() {

    const book = await this.sessionService.getCurrentBookData() ?? new Date()

    this.endDate = book.end ?? new Date();
    this.startDate = book.start ?? new Date();

    this.startHour = book.startHour!
    this.endHour = book.endHour!

    console.log(this.startHour);
    console.log(this.endHour);

    console.log(this.getSelectValueSelected(this.startHour),)
    this.datePickerForm.patchValue({
      startDate: this.startDate,
      endDate: this.endDate,
      startHour: this.startHour,
      endHour: this.endHour,
    })

    this.bookingService.getCars(this.startDate, this.endDate)
      .subscribe((availableCar) => {
        this.cars = availableCar
        console.log(this.cars)

      })


  }

  private getSelectValueSelected(value: Time) {
    return {
      value: {hours: value.hours, minutes: value.minutes},
      display: `${value.hours.toString().padStart(2, '0')}:${value.minutes.toString().padStart(2, '0')}`
    }
  }

  selectCar(car: Car) {
    this.sessionService.chooseCar(car);
    this.router.navigate(['/car-details'])
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

    if (endDate < startDate) {
      throw new Error()
    }

    this.startDate = startDate
    this.endDate = endDate
    //in booking service this method going to initialize a list of available car and car-pickers component will call this list of cars
    this.bookingService.getCars(this.startDate, this.endDate)
      .subscribe((availableCar) => {
        this.cars = availableCar
        console.log(this.cars)

        this.scrollToCarsContainer()

      })

    this.sessionService.chooseDate(startDate, endDate, startHourAndMin, endHourAndMin);
  }

  getHoursInDay() {
    let timeOfDates: SelectValue[] = []
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        timeOfDates.push({
          value: {hours: hours, minutes: minutes},
          display: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
        })
      }
    }
    console.log(timeOfDates)
    return timeOfDates;
  }

}
