import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Contrat} from "../../model/Contract";
import {ContractService} from "../../contract.service";
import {single} from "rxjs";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit, AfterViewInit {

  seeSignForm = false;

  idOfContract = '';

  contract!: Contrat | undefined

  spin = true;

  constructor(private route: ActivatedRoute, private contractService: ContractService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.idOfContract = this.route.snapshot.queryParams['contract'];
    this.contractService.getContractById(this.idOfContract).subscribe((value) => {
      this.contract = value;
      console.log(this.contract);
      this.spin = false;
    })
    console.log(this.idOfContract)
  }


  displaySignForm() {
    this.seeSignForm = true;
  }

  hideSignForm() {
    this.seeSignForm = false;
  }

  sign(signature: string) {

    if (this.contract !== undefined && this.contract.id !== undefined) {
      this.contract.signature = signature
      this.contract.sign = true
      this.contractService.updateContract(this.contract.id, this.contract)
    }
  }
}
