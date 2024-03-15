import {FileUpload} from "./FileUpload";

export class BookFormData {

  public licenseRecto!: FileUpload;
  public licenseVerso!: FileUpload;
  public addressProof!: FileUpload;
  public fullname!: string
  public address!: string
  public mail!: string

  constructor(
  ) {
  }

}
