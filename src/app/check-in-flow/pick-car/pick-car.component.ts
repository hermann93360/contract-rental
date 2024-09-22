import {AfterViewInit, Component} from '@angular/core';
import {MapsComponent} from "../../maps/maps.component";
import {StartComponent} from "../start/start.component";
import {CheckInService} from "../../../services/check-in.service";
import {ButtonComponent} from "../../elements/button/button.component";
import {CardInfoComponent} from "../card-info/card-info.component";
import {CarBoxService} from "../../../services/car-box.service";

@Component({
  selector: 'app-pick-car',
  standalone: true,
  imports: [
    MapsComponent,
    StartComponent,
    ButtonComponent,
    CardInfoComponent
  ],
  templateUrl: './pick-car.component.html',
  styleUrl: './pick-car.component.scss'
})
export class PickCarComponent implements AfterViewInit {

  public displayIntroductionSide!: boolean
  public carCoordinates!: google.maps.LatLngLiteral;
  private geocoder: any;

  constructor(private checkInService: CheckInService, private carBoxService: CarBoxService) {
    this.geocoder = new google.maps.Geocoder();
    this.checkInService.sharedFlow.subscribe((flow) => {
      if (flow.currentStep === 'start') {
        this.displayIntroductionSide = true;
      } else {
        this.displayIntroductionSide = false;
      }
    });

    this.carBoxService.coordinates.subscribe((coordinates) => {
      console.log(coordinates)
      this.carCoordinates = coordinates;
    });
  }

  ngAfterViewInit(): void {

  }

}
