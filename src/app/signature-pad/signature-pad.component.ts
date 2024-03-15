import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
    selector: 'app-signature-pad',
    templateUrl: './signature-pad.component.html',
    standalone: true,
    styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements AfterViewInit{

  @Output()
  hideSignFormEmitter = new EventEmitter<boolean>();

  @Output()
  signatureEmitter = new EventEmitter<string>();


  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  error: boolean = false;


  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    console.log(base64Data)
    if(this.signaturePad.isEmpty()){
      this.error = true;
    }else{
      this.signatureEmitter.emit(base64Data);
      this.hideSignForm();
    }
  }

  clearPad() {
    this.signaturePad.clear();
  }

  hideSignForm(){
    this.hideSignFormEmitter.emit(false);
  }

}
