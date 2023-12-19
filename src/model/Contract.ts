export class Contrat {
  fullname: string;
  address: string;
  city: string;
  caution: string;
  vehicle: string;
  matriculation: string;
  start: Date;
  end: Date;
  sign: boolean = false;

  constructor(
    fullname: string,
    address: string,
    city: string,
    caution: string,
    vehicle: string,
    matriculation: string,
    start: Date,
    end: Date
  ) {
    this.fullname = fullname;
    this.address = address;
    this.city = city;
    this.caution = caution;
    this.vehicle = vehicle;
    this.matriculation = matriculation;
    this.start = start;
    this.end = end;
    this.sign = false;
  }
}
