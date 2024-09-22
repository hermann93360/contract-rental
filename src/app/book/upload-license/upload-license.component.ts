import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FileUpload} from "../../../model/FileUpload";
import {DocumentType} from "../../../model/DocumentType";
import {Licenses} from "../../../model/Upload-component/Licenses";

@Component({
  selector: 'app-upload-license',
  templateUrl: './upload-license.component.html',
  styleUrl: './upload-license.component.scss'
})
export class UploadLicenseComponent {

  @Output()
  fileVersoEmitter: EventEmitter<Licenses> = new EventEmitter<Licenses>();

  selectedFileVerso!: File
  selectedFileRecto!: File
  selectedLicenceVerso: any
  selectedLicenceRecto: any

  constructor() {
  }

  selectVerso(event: any): void {
    this.selectedFileVerso = event.target.files.item(0)
    console.log(this.selectedFileVerso)

    const reader = new FileReader();
    reader.onload = (e: any) => this.selectedLicenceVerso = e.target.result;
    reader.readAsDataURL(this.selectedFileVerso);
  }

  selectRecto(event: any): void {
    this.selectedFileRecto = event.target.files.item(0)

    const reader = new FileReader();
    reader.onload = (e: any) => this.selectedLicenceRecto = e.target.result;
    reader.readAsDataURL(this.selectedFileRecto);
  }

  upload(): void {
    if (this.selectedFileRecto && this.selectedFileVerso) {
      const licenses: Licenses = {verso: this.selectedFileRecto, recto: this.selectedFileVerso}
      this.fileVersoEmitter.emit(licenses)
    }
  }

  openBoxForChooseFile(verso: HTMLInputElement) {
    verso.click();
  }
}
