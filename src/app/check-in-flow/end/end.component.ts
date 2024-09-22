import { Component } from '@angular/core';
import {CheckInService} from "../../../services/check-in.service";

@Component({
  selector: 'app-end',
  standalone: true,
  imports: [],
  templateUrl: './end.component.html',
  styleUrl: './end.component.scss'
})
export class EndComponent {

  constructor(private checkInService: CheckInService) {
    //implements control to check if previous steps were well filled
    this.checkInService.updateContractSupport("check-out").catch((error) => {
      console.error('Error updating user status:', error);
    })
  }
}
