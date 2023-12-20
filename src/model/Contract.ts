export class Contrat {
  constructor(
    public fullname: string,
    public address: string,
    public city: string,
    public caution: string,
    public vehicle: string,
    public matriculation: string,
    public start: Date,
    public end: Date,
    public sign: boolean,
    public price: string,
    public identifier: string,
    public signature: string,
    public id?: string,
  ) {
  }

}
