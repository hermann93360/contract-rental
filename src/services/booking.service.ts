import { Injectable } from '@angular/core';
import {Car, ICar} from "../model/Car";
import {BehaviorSubject, finalize, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Booking} from "../model/Contract";
import {Book} from "../model/Book";
import {DetailsName, ExteriorName, InteriorName} from "../model/CheckPhotos";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  sharedCars: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([])
  progressBooking: Book = Book.init()
  progressBookingAsync: BehaviorSubject<Book> = new BehaviorSubject<Book>(this.progressBooking)

  constructor(private store: AngularFirestore, private storage: AngularFireStorage) {

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
    this.getCars(startDate, endDate).subscribe((cars) => {
      this.sharedCars.next(cars);
    })
  }

  getCars(startDate: Date, endDate: Date):Observable<Car[]> {
    return this.store.collection('cars').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const iCar = { id, ...data }

        console.log(iCar)
        return Car.fromICar(iCar)
      })),
    );
  }

  getPhotosOfCars(carId: string) {
    console.log(carId)
    return this.store
      .collection('car-photos', ref => ref
        .where('carId', '==', carId))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          return {type: data.type, url: data.path}
        })),
      );

  }


  addImages(documentId: string, newImages: File[], type: string) {
    for (let i = 0; i < newImages.length; i++) {
      const filePath = this.getFilePath(i, newImages[i].name);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, newImages[i]);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            const data = {
              carId: documentId,
              type: type,
              path: url
            }

            this.store.collection('car-photos').add(data)
          });
        })
      ).subscribe();

    }

  }

  private getFilePath(indice: number, name: string): string {
    return `car-photos/${Date.now()}_car_${indice}-${name}.jpeg`;
  }

  //to move in car service
}
