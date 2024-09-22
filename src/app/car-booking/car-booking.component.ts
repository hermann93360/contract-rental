import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {TotalPriceComponent} from "../elements/total-price/total-price.component";
import {AsyncPipe, Location} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {Addresses} from "../../model/Addresses";
import {map, Observable, startWith} from "rxjs";
import {AdressService} from "../../services/adress.service";
import {BookingService} from "../../services/booking.service";
import {Book} from "../../model/Book";
import {SessionService} from "../../services/session.service";
import {AppModule} from "../app.module";

@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrl: './car-booking.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CarBookingComponent implements OnInit{

  myControl = new FormControl<string | Addresses>('', Validators.required);
  options: Addresses[] = [];
  filteredOptions!: Observable<any[]>;
  book: Book

  form: FormGroup

  constructor(private addressService: AdressService,
              private formBuilder: FormBuilder,
              private sessionSession: SessionService,
              private bookingService: BookingService,
              private location: Location) {


    this.book = this.sessionSession.bookingData
    this.form = this.formBuilder.group({
      delivery: ["false"],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      mail: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      license: ['', Validators.required],
      dateOfLicense: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    })

    this.populateForm(this.book);
  }

  populateForm(book: Book): void {
    console.log(book)
    this.form.patchValue({
      name: book.lastname,
      firstname: book.firstname,
      mail: book.mail,
      phone: book.phone,
      address: book.address,
      license: book.licenseNumber,
      dateOfLicense: book.dateOfLicense ? book.dateOfLicense.toISOString().substring(0, 10) : '',
      dateOfBirth: book.dateOfBirth ? book.dateOfBirth.toISOString().substring(0, 10) : ''
    });
  }

  submitForm() {
    console.log(this.form.value)
    if(!this.form.valid) {
      throw new Error();
    }

    const formValue = this.form.value;
    this.sessionSession.sendPrivateData(
      formValue['firstname'],
      formValue['name'],
      formValue['mail'],
      formValue['address'],
      formValue['phone'],
      formValue['license'],
      formValue['dateOfLicense'],
      formValue['dateOfBirth']);
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

  private _filter(name: string): Addresses[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
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

  goPreviousPage() {
    this.location.back();
  }


}
