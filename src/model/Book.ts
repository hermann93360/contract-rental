import {Car} from "./Car";
import {SelectValue} from "../app/elements/input/input.component";
import {Time} from "@angular/common";

export  class Book {
  public lastname?: string
  public firstname?: string
  public mail?: string
  public address?: string
  public car?: Car
  public start?: Date
  public end?: Date
  public price?: number
  public phone?: string
  public licenseNumber?: string
  public dateOfLicense?: Date
  public insuranceType?: string
  public dateOfBirth?: Date
  public login?: string
  public contractId?: string
  public carSupport?: string
  public startHour?: Time
  public endHour?: Time


  constructor() {
  }

  static init(): Book {
    return new Book();
  }

  static fromSerialized(serializedBook: any): Book {
    const book = new Book();

    console.log(serializedBook)
    book.lastname = serializedBook.lastname;
    book.firstname = serializedBook.firstname;
    book.mail = serializedBook.mail;
    book.address = serializedBook.address;
    book.car = Car.fromICar(serializedBook.car);
    book.start = new Date(serializedBook.start);
    book.end = new Date(serializedBook.end);
    book.price = serializedBook.price;
    book.phone = serializedBook.phone;
    book.licenseNumber = serializedBook.licenseNumber;
    book.dateOfLicense = new Date(serializedBook.dateOfLicense);
    book.insuranceType = serializedBook.insuranceType;
    book.dateOfBirth = new Date(serializedBook.dateOfBirth);
    book.login = serializedBook.login;
    book.startHour = serializedBook.startHour;
    book.endHour = serializedBook.endHour;
    console.log(book.startHour)
    console.log(book.endHour)
    return book;
  }
}

