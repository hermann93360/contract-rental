import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Addresses} from "../../../model/Addresses";
import {AdressService} from "../../../services/adress.service";
import {PersonData} from "./PersonData";

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {

  @Output()
  personData: EventEmitter<PersonData> = new EventEmitter<PersonData>();

  myControl = new FormControl<string | Addresses>('', Validators.required);
  options: Addresses[] = [];
  filteredOptions!: Observable<any[]>;
  dataForm!: FormGroup

  constructor(private addressService: AdressService, private formBuilder: FormBuilder) {
    this.dataForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', Validators.required],

    })
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.label;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  formIsValid() {
    return this.dataForm.valid && this.myControl.valid
  }

  displayFn(address: Addresses): string {
    return address && address.label ? address.label : '';
  }

  private _filter(name: string): Addresses[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }
  saveData() {
    let  addressControl = ""
    if(this.myControl.value != undefined){
      addressControl = typeof this.myControl.value === "string" ? this.myControl.value : this.myControl.value?.label
    }
    const personData : PersonData = {
      fullname: this.dataForm.value['firstname'] + ' ' + this.dataForm.value['lastname'],
      address: addressControl,
      mail: this.dataForm.value['mail']
    }

    this.personData.emit(personData);
  }

  setAddresses(address: HTMLInputElement) {
    if(address.value.length > 3) {
      this.addressService.getAddress(address.value).subscribe((value) => {
        this.options = value
        console.log(value)
      })
    }else{
      this.options = []
    }

  }
}
