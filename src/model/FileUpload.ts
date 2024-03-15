import {DocumentType} from "./DocumentType";

export class FileUpload {
  id: string;
  name: string;
  url: string;
  contractId: string;
  docType: DocumentType;
  file: File;
  progress: number;

  constructor(contractId: string, docType: DocumentType, file: File) {
    this.file = file
    this.id = ''
    this.name = ''
    this.url = ''
    this.contractId = contractId
    this.docType = docType;
    this.progress = 0;
  }

  public getFileUploadForSave() {
    return {name: this.name, url: this.url, contractId: this.contractId, docType: this.docType}
  }
}
