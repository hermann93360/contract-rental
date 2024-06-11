import { Injectable } from '@angular/core';
import {Car, ICar} from "../model/Car";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Booking} from "../model/Contract";
import {Book} from "../model/Book";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  sharedCars: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([])
  progressBooking: Book = Book.init()
  progressBookingAsync: BehaviorSubject<Book> = new BehaviorSubject<Book>(this.progressBooking)

  constructor(private store: AngularFirestore) {

  }

  patchBook(updatedBook: Book){
    this.progressBooking = updatedBook
    this.progressBookingAsync.next(updatedBook)
    console.log(updatedBook)
  }

  getBook() {
    return this.progressBooking
  }

  setAvailableCar(startDate: Date, endDate: Date) {
    this.getCars().subscribe((cars) => {
      this.sharedCars.next(cars);
    })
  }

  getCars() :Observable<Car[]> {
    return this.store.collection('cars').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const iCar = { id, ...data }
        return Car.fromICar(iCar)
      })),
    );
  }

  //to move in car service
  saveCar(car: Car) {
    const carToSave: ICar = {...car}
    return this.store.collection('cars').add(carToSave);
  }
}
