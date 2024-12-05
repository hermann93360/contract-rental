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
  startHours: SelectValue[] = []
  endHours: SelectValue[] = []
  @ViewChild('carsContainer', {static: false})
  carsContainer!: ElementRef;
  scroll = true;
  today = new Date("12/06/2024");



  constructor(private bookingService: BookingService,
              private sessionService: SessionService,
              private router: Router,
              private formBuilder: FormBuilder,
              private viewportScroller: ViewportScroller,
              private appRef: ApplicationRef,
              private zone: NgZone) {
    this.startHours = this.getHoursInDay(0);
    this.endHours = this.getHoursInDay(0);
    this.buildForm()
    this.changeOnDates()
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
            this.endHours = this.getHoursInDay(value.startHour.hours)
          }
        }
      }
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
        this.cars.forEach(car => {
          this.bookingService.getPhotosOfCars(car.id??'').subscribe((photos) => {
            car.illustration = photos;
          })
        })

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

  getHoursInDay(filter?: number) {

    console.log(filter)
    let timeOfDates: SelectValue[] = []
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes+=30) {
        if(filter && hours >= filter) {
          timeOfDates.push({
            value: {hours: hours, minutes: minutes},
            display: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          })
        }

      }
    }
    return timeOfDates;
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    // Comparer avec aujourd'hui
    return date <= new Date();
  };

  getMainIllustration(car: Car) {
    const main = car.illustration?.find(illustration => illustration.type === "main");
    if(main) {
      return main.url
    }
    return "assets/images/Manycar_28-04-2024-7.jpg"
  }
}
