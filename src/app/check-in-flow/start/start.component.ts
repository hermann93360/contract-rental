import { Component } from '@angular/core';
import {ButtonComponent} from "../../elements/button/button.component";
import {CheckInService} from "../../../services/check-in.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  constructor(private checkInService: CheckInService, private router: Router) {
  }
  start() {
    this.checkInService.navigateTo("pick-car")
  }
}
