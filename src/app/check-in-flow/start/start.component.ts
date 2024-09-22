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

  private carSupport: string | undefined

  constructor(private checkInService: CheckInService, private router: Router) {
    this.checkInService.sharedFlow.subscribe((flow) => {
      this.carSupport = flow.carSupport;
    })
  }
  start() {
    this.checkInService.navigateTo("pick-car")
  }

  getIntroduceText() {
    if(this.carSupport === "check-in") {
      return "Commençons ensemble l'état des lieux de votre véhicule de location pour garantir une expérience transparente et sécurisée dès le départ."
    }
    return "Commençons ensemble l'état des lieux de la remise du véhicule de location"
  }
}
