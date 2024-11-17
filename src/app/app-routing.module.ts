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
import {CheckInFlowComponent} from "./check-in-flow/check-in-flow.component";
import {PickCarComponent} from "./check-in-flow/pick-car/pick-car.component";
import {ExteriorComponent} from "./check-in-flow/exterior/exterior.component";
import {CheckInService} from "../services/check-in.service";
import {InteriorComponent} from "./check-in-flow/interior/interior.component";
import {DetailsComponent} from "./check-in-flow/details/details.component";
import {BlemishesComponent} from "./check-in-flow/blemishes/blemishes.component";
import {EndComponent} from "./check-in-flow/end/end.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'set-contract', component: SetContractComponent },
  { path: 'book', component: BookComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cars-picker', component: CarPickerComponent },
  { path: 'car-details', component: CarDetailsComponent },
  { path: 'car-booking', component: CarBookingComponent },
  { path: 'check-in/:id', component: CheckInFlowComponent, children: [
      {path: 'start', component: PickCarComponent},
      {path: 'pick-car', component: PickCarComponent},
      {path: 'exterior', component: ExteriorComponent},
      {path: 'interior', component: InteriorComponent},
      {path: 'details', component: DetailsComponent},
      {path: 'blemishes', component: BlemishesComponent},
      {path: 'end', component: EndComponent}
    ] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
