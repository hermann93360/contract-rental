import {Component, EventEmitter, Output} from '@angular/core';
import {DigitComponent} from "../digit/digit.component";

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [
    DigitComponent
  ],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {

  @Output()
  digitCompleted: EventEmitter<string> = new EventEmitter<string>()

  checkCode(code: string) {
    if(code.length === 4) {
      this.digitCompleted.emit(code)
      console.log(code)
    }
  }
}
