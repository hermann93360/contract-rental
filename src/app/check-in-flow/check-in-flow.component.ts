import {Component, OnInit} from '@angular/core';
import {StartComponent} from "./start/start.component";
import {PickCarComponent} from "./pick-car/pick-car.component";
import {CheckInService} from "../../services/check-in.service";
import {ButtonComponent} from "../elements/button/button.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-check-in-flow',
  standalone: true,
  imports: [
    StartComponent,
    PickCarComponent,
    ButtonComponent,
    RouterOutlet,
    MatProgressSpinnerModule
  ],
  templateUrl: './check-in-flow.component.html',
  styleUrl: './check-in-flow.component.scss'
})
export class CheckInFlowComponent implements OnInit {

  public displayIntroductionSide!: boolean
  public currentStep!: string
  public canDoCheckIn: boolean = false
  public inProgress = true;

  constructor(private checkInService: CheckInService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.checkInService.processContractId(params.get('id'))
      }
    });

    this.checkInService.sharedContractId?.subscribe((contractId) => {
      console.log(contractId)
      if(contractId){
        this.canDoCheckIn = true;
      }
      this.inProgress = false;
    })

    this.checkInService.sharedFlow.subscribe((flow) => {
      this.currentStep = flow.currentStep
      if (flow.currentStep === 'start') {
        this.displayIntroductionSide = true;
        console.log(this.displayIntroductionSide)
      } else {
        this.displayIntroductionSide = false;
      }
    })
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      let childRoute = this.activatedRoute.firstChild;
      const childRouteName = childRoute?.snapshot.routeConfig?.path?.split('/')[0]
      const action = childRoute?.snapshot.paramMap.get('action');
      console.log('Nom de la route enfant:', childRouteName, action);
      this.checkInService.changeStep(childRouteName!, action)
    });

  }
}
