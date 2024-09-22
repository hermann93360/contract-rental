import { Injectable } from '@angular/core';
import {Car, ICar} from "../model/Car";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Booking} from "../model/Contract";
import {Book} from "../model/Book";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public bookingData: Book = Book.init();
  public data: BehaviorSubject<Book>;

  constructor(private store: AngularFirestore) {
    this.bookingData = Book.init();
    this.initialize();
    this.data = new BehaviorSubject<Book>(this.bookingData);
  }
  public chooseDate(start: Date, end: Date): void {
    this.bookingData.start = start;
    this.bookingData.end = end;
    this.persist();
  }

  public chooseCar(car: Car): void {
    this.bookingData.car = car;
    this.refreshPrice();
    this.persist();
  }

  public chooseInsurance(insuranceType: string): void {
    this.bookingData.insuranceType = insuranceType;
    this.refreshPrice();
    this.persist();
  }

  public sendPrivateData(firstname: string, lastname: string, mail: string, address: string, phone: string, licenseNumber: string, dateOfLicense: Date, dateOfBirth: Date): void {
    this.bookingData.firstname = firstname;
    this.bookingData.lastname = lastname;
    this.bookingData.mail = mail;
    this.bookingData.address = address;
    this.bookingData.phone = phone;
    this.bookingData.licenseNumber = licenseNumber;
    this.bookingData.dateOfLicense = dateOfLicense;
    this.bookingData.dateOfBirth = dateOfBirth;
    this.refreshPrice();
    this.persist();
  }

  public removeAll(): void {
    this.bookingData = Book.init();
    this.persist();
  }

  private initialize() {
    let maybeData = localStorage.getItem("bookData");
    if(maybeData){
      this.bookingData = Book.fromSerialized(JSON.parse(maybeData));
    }
  }

  private refreshPrice(): void {
    const start = this.bookingData.start;
    const end = this.bookingData.end;
    const insuranceType = this.bookingData.insuranceType;

    if(start && end) {
      if(insuranceType === 'STANDARD') {
        this.bookingData.price = this.bookingData.car?.getTotalStandardInsurancePrice(start, end, [])
      } else if(insuranceType === 'PREMIUM') {
        this.bookingData.price = this.bookingData.car?.getTotalPremiumInsurancePrice(start, end, [])
      } else {
        this.bookingData.price = this.bookingData.car?.getTotalPrice(start, end, [])
      }
    }
  }

  private persist(): void {
    const bookingDataAsJson: string = JSON.stringify(this.bookingData);
    this.data.next(this.bookingData);
    localStorage.setItem('bookData', bookingDataAsJson)
  }
}
