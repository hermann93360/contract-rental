import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContractComponent} from "./contract/contract.component";
import {SetContractComponent} from "./set-contract/set-contract.component";
import {BookForm} from "../model/BookForm";
import {BookComponent} from "./book/book.component";
import {HomeComponent} from "./home/home.component";
import {CarPickerComponent} from "./car-picker/car-picker.component";
import {CarDetailsComponent} from "./car-details/car-details.component";
import {CarBookingComponent} from "./car-booking/car-booking.component";

const routes: Routes = [
  { path: 'contract', component: ContractComponent },
  { path: 'set-contract', component: SetContractComponent },
  { path: 'book', component: BookComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cars-picker', component: CarPickerComponent },
  { path: 'car-details', component: CarDetailsComponent },
  { path: 'car-booking', component: CarBookingComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
