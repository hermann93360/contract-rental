import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../../elements/button/button.component";
import {CheckInService} from "../../../services/check-in.service";
import {CarBoxService} from "../../../services/car-box.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {

  public currentStep!: string
  public carSupport!: string
  @Input()
  public check!: boolean
  public addressOfCar!: string

  @Output()
  public camera = new EventEmitter();

  constructor(private checkInService: CheckInService, private boxService: CarBoxService, private router: Router) {
    this.checkInService.sharedFlow.subscribe((flow) => {
      this.currentStep = flow.currentStep
      if (flow.carSupport) {
        this.carSupport = flow.carSupport
      }
    });

    this.boxService.address.subscribe((address) => {
      this.addressOfCar = address;
    })
  }

  navigate(route?: string) {
    if (route) {
      this.checkInService.navigateTo(route)
    } else {
      this.checkInService.navigateTo()
    }
  }

  displayCamera() {
    this.camera.emit(true);
  }

  isPhotosStep() {
    return this.currentStep === 'exterior' ||
      this.currentStep === 'interior' ||
      this.currentStep === 'details' ||
      this.currentStep === 'blemishes';
  }

  getButtonText(): string {
    switch (this.currentStep) {
      case "exterior" :
        return "Prenez des photos de l'exterieur";
      case "interior" :
        return "Prenez des photos de l'intérieur";
      case "details" :
        return "Prenez des photos du kilométrage et de l'essence";
      case "blemishes" :
        return "Prenez des photos des imperfections";
    }
    return "";
  }

  getTitle(){
    if(this.carSupport === 'check-in'){
      return "Rendez-vous au véhicule"
    }
    return "Déposez le véhicule"
  }
}
