import { Component } from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent {

  seeSignForm = false;


  displaySignForm(){
    this.seeSignForm = true;
  }

  hideSignForm() {
    this.seeSignForm = false;
  }
}
