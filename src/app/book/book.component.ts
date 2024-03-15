import {Component} from '@angular/core';
import {UploadLicenseComponent} from "./upload-license/upload-license.component";
import {BookForm} from "../../model/BookForm";
import {FormType} from "../../model/FormType";
import {BookFormData} from "../../model/BookFormData";
import {BookServiceService} from "../../services/book-service.service";
import {FileUpload} from "../../model/FileUpload";
import {DocumentType} from "../../model/DocumentType";
import {Licenses} from "../../model/Upload-component/Licenses";
import {UploadAddressProofComponent} from "./upload-address-proof/upload-address-proof.component";
import {DataComponent} from "./data/data.component";
import {PersonData} from "./data/PersonData";
import {InitComponent} from "./init/init.component";
import {ActivatedRoute} from "@angular/router";
import {ContractService} from "../../contract.service";
import {Contrat} from "../../model/Contract";
import {ConfirmationComponent} from "./confirmation/confirmation.component";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    UploadLicenseComponent,
    UploadAddressProofComponent,
    DataComponent,
    InitComponent,
    ConfirmationComponent
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  contractId: string;
  contract!: Contrat | undefined

  bookFormStep: BookForm = BookForm.init();
  bookFormData: BookFormData = new BookFormData();

  constructor(private bookService: BookServiceService, private route: ActivatedRoute, private contractService: ContractService) {
    this.contractId = this.route.snapshot.queryParams['contract'];
    this.contractService.getContractById(this.contractId).subscribe((value) => {
      this.contract = value;
    })
  }

  getDataForLicense(licenses: Licenses) {
    if (licenses.recto && licenses.verso) {
      const currentLicenseFileUploadRecto = new FileUpload(this.contractId, DocumentType.LICENSE_RECTO, licenses.recto);
      const currentLicenseFileUploadVerso = new FileUpload(this.contractId, DocumentType.LICENSE_VERSO, licenses.verso);
      this.bookService.uploadFile(currentLicenseFileUploadRecto).then((fileId) => {
        if (this.contract)
          this.contract.licenseRectoFileId = fileId
      }).then((value) => {
        this.bookService.uploadFile(currentLicenseFileUploadVerso).then((fileId) => {
          if (this.contract)
            this.contract.licenseVersoFileId = fileId
        }).then((value) => {
          if (this.contract)
            this.contract.formStep = FormType.PROOF_ADDRESS
        }).then(() => {
          if (this.contract) {
            this.contract.formStep = FormType.PROOF_ADDRESS;
            this.contractService.updateContract(this.contractId, this.contract);
          }

          this.bookFormStep.go(FormType.PROOF_ADDRESS);
          console.log(this.contract)
        })
      })

    }
  }

  getDataForAddressProof(addressProof: File) {
    const proofOfAddress = new FileUpload(this.contractId, DocumentType.ADDRESS_PROOF, addressProof);
    this.bookService.uploadFile(proofOfAddress).then((fileId) => {
      if (this.contract)
        this.contract.addressProofFileId = fileId
    }).then(() => {
      if (this.contract) {
        this.contract.formStep = FormType.CONFIRMATION;
        this.contractService.updateContract(this.contractId, this.contract);
      }
      this.bookFormStep.go(FormType.CONFIRMATION);
      console.log(this.contract)
    })
  }

  getDataForPerson(personData: PersonData) {
    console.log(this.contract)
    if (this.contract) {
      this.contract.fullname = personData.fullname
      this.contract.address = personData.address
      this.contract.mail = personData.mail
      this.contract.formStep = FormType.UPLOAD_LICENSE
      this.contractService.updateContract(this.contractId, this.contract);
    }
    this.bookFormStep.go(FormType.UPLOAD_LICENSE);
  }

  uploadLicensesFile(licenses: Licenses) {

  }

  protected readonly FormType = FormType;


  connectWithCode(code: string) {
    console.log(code)
    console.log(this.contract?.code)
    if (code === this.contract?.code) {
      this.bookFormStep.go(this.contract.formStep);
    }
  }
}
