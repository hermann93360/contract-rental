import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrl: './digit.component.scss'
})
export class DigitComponent {

  @ViewChild('case1')
  private firstCase!: ElementRef

  @ViewChild('input1')
  private firstInput!: ElementRef

  @ViewChild('input2')
  private secondInput!: ElementRef

  @ViewChild('input3')
  private thirdInput!: ElementRef

  @ViewChild('input4')
  private lastInput!: ElementRef

  @Output()
  public digitCode: EventEmitter<string> = new EventEmitter<string>();

  value: string = ''

  onKeyup(event: KeyboardEvent, currentInput: HTMLInputElement, nextInput?: HTMLInputElement, currentCase?: HTMLDivElement, nextCase?: HTMLDivElement, number?: number) {
    if(event.key === 'Tab'){
      event.preventDefault();
    }else{
      if (currentInput.value.length === 1 && nextInput) {
        nextInput.focus();
        currentInput.classList.remove('focus-underline')
        nextInput.classList.add('focus-underline')
        currentCase?.classList.remove('focus');
        nextCase?.classList.add('focus');
        this.constructValue();
      }
    }

  }

  ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus()
  }

  onKeyUpDelete(currentInput: HTMLInputElement, nextInput?: HTMLInputElement, currentCase?: HTMLDivElement, nextCase?: HTMLDivElement, number?: number) {
    if (currentInput.value.length === 0 && nextInput) {
      nextInput.focus();
      currentInput.classList.remove('focus-underline')
      nextInput.classList.add('focus-underline')
      currentCase?.classList.remove('focus');
      nextCase?.classList.add('focus');
      this.constructValue();
    }
  }

  focusHandler(surround: HTMLDivElement, inside: HTMLDivElement) {
    surround.classList.add('focus')
    inside.classList.add('focus-underline')
  }

  blurHandler(surround: HTMLDivElement, inside: HTMLDivElement){
    surround.classList.remove('focus')
    inside.classList.remove('focus-underline')
  }

  constructValue() {
    this.value = this.firstInput.nativeElement.value + this.secondInput.nativeElement.value + this.thirdInput.nativeElement.value + this.lastInput.nativeElement.value;
    this.digitCode.emit(this.value);
  }
}
