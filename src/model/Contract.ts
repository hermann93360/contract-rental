import {FormType} from "./FormType";
import {Car} from "./Car";

export class Booking {

  static init(): Booking {
    return new Booking("na", "na", "na",
      new Car("na", "na", "na", "na", "na", "na", "na", "na", "na", [], [], [], "na",0, "na"), new Date(), new Date(), "na",
      "na", "na", "na", "na", "na", "na", FormType.CONFIRMATION, "na"
      , false, "na", "na", "na", "na", "na", "na", "na")
  }
  constructor(
    public fullName: string,
    public mail: any,
    public address: string,
    public car: Car,
    public start: Date,
    public end: Date,
    public price: string,
    public phone: string,
    public licenseNumber: string,
    public dateOfLicense: string,
    public login: string,


    public signature: string,
    public code: string,
    public formStep: FormType,
    public identifier: string,
    public sign: boolean,
    public matriculation: string,
    public vehicle: string,
    public licenseRectoFileId: any,
    public licenseVersoFileId?: any,
    public addressProofFileId?: any,
    public id?: string,
    public caution?: string,
  ) {
  }

}
