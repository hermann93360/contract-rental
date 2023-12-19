import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Contrat} from "../../model/Contract";

@Component({
  selector: 'app-set-contract',
  templateUrl: './set-contract.component.html',
  styleUrls: ['./set-contract.component.scss']
})
export class SetContractComponent {

  formToAddContract: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.formToAddContract = this.formBuilder.group({
      fullname: [],
      address: [],
      city: [],
      caution: [],
      vehicle: [],
      matriculation: [],
      start: [],
      end: [],
      sign: false
    })
  }

  createContract() {
    const contratInstance : Contrat = { ...this.formToAddContract.value } as Contrat;
    console.log(contratInstance)
  }
}
