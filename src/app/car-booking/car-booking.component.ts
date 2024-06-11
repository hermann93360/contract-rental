import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {TotalPriceComponent} from "../elements/total-price/total-price.component";
import {AsyncPipe} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {Addresses} from "../../model/Addresses";
import {map, Observable, startWith} from "rxjs";
import {AdressService} from "../../services/adress.service";
import {BookingService} from "../../services/booking.service";
import {Book} from "../../model/Book";

@Component({
  selector: 'app-car-booking',
  standalone: true,
  imports: [
    MatProgressBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    TotalPriceComponent,
    AsyncPipe,
    MatAutocompleteModule,
    MatOptionModule
  ],
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
              private bookingService: BookingService) {
    this.book = this.bookingService.getBook()
    this.form = this.formBuilder.group({
      delivery: ["false"]
    })
    this.form.valueChanges.subscribe(value => {
      if(value['delivery'] == 'true') {
        this.addDeliveryPriceInTotalPrice()
      }else {
        this.removeDeliveryPriceInTotalPrice()
      }
    })
  }

  addDeliveryPriceInTotalPrice() {
    this.book.price! += 50
    this.bookingService.patchBook(this.book);
  }
  removeDeliveryPriceInTotalPrice() {
    this.book.price! -= 50
    this.bookingService.patchBook(this.book);
  }
  displayFn(address: Addresses): string {
    return address && address.label ? address.label : '';
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

}
