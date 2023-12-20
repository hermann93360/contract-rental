import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Contrat} from "../../model/Contract";
import {ContractService} from "../../contract.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-set-contract',
  templateUrl: './set-contract.component.html',
  styleUrls: ['./set-contract.component.scss']
})
export class SetContractComponent {

  formToAddContract: FormGroup
  constructor(private formBuilder: FormBuilder, private contractService: ContractService, private router: Router) {
    this.formToAddContract = this.formBuilder.group({
      fullname: [],
      address: [],
      city: [],
      caution: [],
      vehicle: [],
      matriculation: [],
      identifier: [],
      start: [],
      end: [],
      price: [],
      sign: false,
      signature: ''
    })
  }

  createContract() {
    const contratInstance : Contrat = { ...this.formToAddContract.value } as Contrat;
    console.log(contratInstance)
    this.contractService.addContract(contratInstance)
    this.contractService.getContractByIdentifier(contratInstance.identifier).subscribe((value) => {
      const queryParams = {contract: value[0].id};
      this.router.navigate(['contract'], {queryParams})
    })
  }
}
