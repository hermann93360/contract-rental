import {Car} from "./Car";

export  class Book {
  public fullName: string | undefined
  public mail: any | undefined
  public address: string | undefined
  public car: Car | undefined
  public start: Date | undefined
  public end: Date | undefined
  public price: number | undefined
  public phone: string | undefined
  public licenseNumber: string | undefined
  public dateOfLicense: string | undefined
  public login: string | undefined


  constructor() {
  }

  static init(): Book {
    return new Book();
  }
}
