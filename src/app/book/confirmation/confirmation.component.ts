import { Component } from '@angular/core';
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SignaturePadComponent} from "../../signature-pad/signature-pad.component";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  currentDate = new Date()

  displayGetCarForm = false;
  toggleGetCarForm() {
    this.displayGetCarForm = !this.displayGetCarForm
  }
}
