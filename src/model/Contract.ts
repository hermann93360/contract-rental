import {FormType} from "./FormType";
import {FileUpload} from "./FileUpload";

export class Contrat {
  constructor(
    public fullname: string,
    public mail: any,
    public address: string,
    public caution: string,
    public vehicle: string,
    public matriculation: string,
    public start: Date,
    public end: Date,
    public sign: boolean,
    public price: string,
    public identifier: string,
    public signature: string,
    public code: string,
    public formStep: FormType,
    public licenseRectoFileId: any,
    public licenseVersoFileId?: any,
    public addressProofFileId?: any,
    public id?: string,
  ) {
  }

}
