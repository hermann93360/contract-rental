import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Contrat} from "../../model/Contract";
import {ContractService} from "../../contract.service";
import {Router} from "@angular/router";
import {FormType} from "../../model/FormType";

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
      code: [],
      sign: false,
      signature: ''
    })
  }

  createContract() {
    const contratInstance : Contrat = { ...this.formToAddContract.value } as Contrat;
    contratInstance.formStep = FormType.START
    contratInstance.licenseRectoFileId = null
    contratInstance.licenseVersoFileId = null
    contratInstance.addressProofFileId = null
    contratInstance.formStep = FormType.SET_DATA
    contratInstance.mail = null

    console.log(contratInstance)
    this.contractService.addContract(contratInstance).then(docRef => {
      const queryParams = {contract: docRef.id};
      this.router.navigate(['book'], {queryParams})
    })
  }
}
