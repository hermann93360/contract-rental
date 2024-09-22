import {Component, EventEmitter, Output} from '@angular/core';
import {Licenses} from "../../../model/Upload-component/Licenses";
import {FileUpload} from "../../../model/FileUpload";

@Component({
  selector: 'app-upload-address-proof',
  templateUrl: './upload-address-proof.component.html',
  styleUrl: './upload-address-proof.component.scss'
})
export class UploadAddressProofComponent {
  @Output()
  addressProof: EventEmitter<File> = new EventEmitter<File>();
  selectedProofFile!: File;

  openBoxForChooseFile(input: HTMLInputElement) {
    input.click();
  }

  selectProofFile(event: any) {
    this.selectedProofFile = event.target.files.item(0)
    console.log(this.selectedProofFile)
  }

  upload() {
    if (this.selectedProofFile) {
      this.addressProof.emit(this.selectedProofFile)
    }
  }
}
