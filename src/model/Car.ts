import {differenceInDays, differenceInHours} from "date-fns";

export interface ICar{
  make: string,
  model: string,
  type: string,
  year: string,
  licensePlate: string,
  distanceIncluded: string,
  fuel: string,
  passenger: string,
  transmission: string,
  equipment: string[],
  photos: string[],
  unavailability: Unavailability[],
  description: string,
  unitPrice: number,
  id?: string
}

export class Car {

  public static HIGH_PERIOD: SpecificPeriod[] =
    [{start: new Date('01-07'), end: new Date('02-09')}]

  constructor(
    public make: string,
    public model: string,
    public type: string,
    public year: string,
    public licensePlate: string,
    public distanceIncluded: string,
    public fuel: string,
    public passenger: string,
    public transmission: string,
    public equipment: string[],
    public photos: string[],
    public unavailability: Unavailability[],
    public description: string,
    public unitPrice: number,
    public id?: string
  ) {
  }

  getPremiumInsurancePrice(debutLocation: Date, finLocation: Date, highPeriod: SpecificPeriod[]) {
    const totalPrice = this.getTotalPrice(debutLocation, finLocation, highPeriod);
    return totalPrice * 0.30;
  }

  getTotalPremiumInsurancePrice(debutLocation: Date, finLocation: Date, highPeriod: SpecificPeriod[]) {
    const totalPrice = this.getTotalPrice(debutLocation, finLocation, highPeriod);
    return totalPrice + this.getPremiumInsurancePrice(debutLocation, finLocation, highPeriod);
  }

  getStandardInsurancePrice(debutLocation: Date, finLocation: Date, highPeriod: SpecificPeriod[]) {
    const totalPrice = this.getTotalPrice(debutLocation, finLocation, highPeriod);
    return totalPrice * 0.15;
  }

  getTotalStandardInsurancePrice(debutLocation: Date, finLocation: Date, highPeriod: SpecificPeriod[]) {
    const totalPrice = this.getTotalPrice(debutLocation, finLocation, highPeriod);
    return totalPrice + this.getStandardInsurancePrice(debutLocation, finLocation, highPeriod);
  }


  static fromICar(carData: ICar): Car {
    return new Car(
      carData?.make,
      carData?.model,
      carData?.type,
      carData?.year,
      carData?.licensePlate,
      carData?.distanceIncluded,
      carData?.fuel,
      carData?.passenger,
      carData?.transmission,
      carData?.equipment,
      carData?.photos,
      carData?.unavailability,
      carData?.description,
      carData?.unitPrice,
      carData?.id
    );
  }

  getTotalDays(start: Date, end: Date): number {
    const oneDaysInHour = 24

    let numberOfDays = differenceInDays(end, start)
    let numberOfHours = differenceInHours(end, start)
    let numberOfRelativeHour = numberOfHours % oneDaysInHour

    return numberOfRelativeHour == 0 ? numberOfDays : numberOfDays + 1;
  }

  isWeekEnd(date: Date): boolean {
    const jour = date.getDay();
    return jour === 0 || jour === 6
  }

  isInHighPeriod(currentDate: Date, highPeriods: SpecificPeriod[]): boolean {
    return highPeriods.some(highPeriod => currentDate >= highPeriod.start && currentDate <= highPeriod.end);
  }

  getTotalPrice(debutLocation: Date, finLocation: Date, highPeriod: SpecificPeriod[]): number {
    debutLocation = new Date(debutLocation)
    finLocation = new Date(finLocation)
    let totalPrice = 0;
    const totalDays = this.getTotalDays(debutLocation, finLocation);

    let currentDate = new Date(debutLocation);

    for (let i = 0; i < totalDays; i++) {
      currentDate.setDate(debutLocation.getDate() + i);

      let unitPriceWithSpecification = this.unitPrice;

      if (this.isInHighPeriod(currentDate, highPeriod)) {
        unitPriceWithSpecification = this.unitPrice * 1.30;
      }

      if (this.isWeekEnd(currentDate)) {
        unitPriceWithSpecification = this.unitPrice * 1.20;
      }

      totalPrice += unitPriceWithSpecification;
    }

    return totalPrice;
  }
}

export interface SpecificPeriod{
  start: Date,
  end: Date
}
export class Unavailability {
  constructor(
    public startDate: string,
    public endDate: string,
    public label: string
  ) {
  }
}
