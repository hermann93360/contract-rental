import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, map, Subject} from "rxjs";
import {Flow} from "../model/Flow";
import {Book} from "../model/Book";
import {F} from "@angular/cdk/keycodes";
import {Exterior, Image} from "../model/CheckPhotos";
import {FirestoreService} from "./firestore.service";
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CheckInService{

  public flow: Flow;
  public sharedFlow: BehaviorSubject<Flow>;
  public contractId?: string
  public sharedContractId: Subject<string | undefined> = new Subject<string | undefined>();

  constructor(private firebaseService: FirestoreService, private router: Router) {
    this.flow = Flow.init();
    this.initialize();
    this.sharedFlow = new BehaviorSubject<Flow>(this.flow)
  }

  public changeStep(stepToGo: string, action?: string | null) {
    this.flow.currentStep = stepToGo;
    this.flow.check = action === 'check';
    this.persist();
  }

  public navigateTo(stepToGo?: string) {
    if(this.flow.currentStep === 'exterior') {
      stepToGo = "interior"
    } else if(this.flow.currentStep === 'interior'){
      stepToGo = "details"
    }else if(this.flow.currentStep === 'details'){
      stepToGo = "blemishes"
    }else if(this.flow.currentStep === 'blemishes'){
      stepToGo = "end"
    }
    this.router.navigate(['/check-in/' + this.contractId + '/' + stepToGo])
  }

  public toggleCheckMode(check: boolean) {
    this.flow.check = check;
    this.persist();
  }

  public addPhotos(images: Image[], type: string, carSupport: string) {
    this.firebaseService.uploadCarPhotos(images, this.contractId!, type, carSupport)
  }
  public getPhotos(type: string, carSupport: string) {
    return this.firebaseService.getCarPhotos(this.contractId!, type, carSupport);
  }

  private getContract(contractId: string) {
    return this.firebaseService.getContract(contractId);
  }

  public updateContractSupport(newCarSupport: string) {
    return this.firebaseService.updateContractSupport(this.contractId!, newCarSupport);
  }

  private initialize() {
    let maybeData = localStorage.getItem("check-in");
    if(maybeData){
      this.flow = Flow.fromSerialized(JSON.parse(maybeData));
    }
  }

  private persist(): void {
    this.sharedFlow.next(this.flow);
  }

  private reset(){
    localStorage.removeItem('check-in')
  }

  processContractId(id: string | null) {
    if(id){
      this.getContract(id).subscribe((value) => {
        if(value){
          this.contractId = id;
          this.sharedContractId.next(this.contractId)
          this.flow.carSupport = value.carSupport
        } else {
          this.sharedContractId.next(undefined)
        }
      })
    }
  }
}
