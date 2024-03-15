import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContractComponent} from "./contract/contract.component";
import {SetContractComponent} from "./set-contract/set-contract.component";
import {BookForm} from "../model/BookForm";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  { path: 'contract', component: ContractComponent },
  { path: 'set-contract', component: SetContractComponent },
  { path: 'book', component: BookComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
