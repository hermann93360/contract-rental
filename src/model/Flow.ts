import {Blemishes, Details, Exterior, Interior} from "./CheckPhotos";

export class Flow{
  public currentStep: string
  public check: boolean
  public exterior?: Exterior
  public interior?: Interior
  public details?: Details
  public blemishes?: Blemishes
  public carSupport?: string

  constructor(currentStep: string, check: boolean) {
    this.currentStep = currentStep;
    this.check = check;
  }

  static init(): Flow {
    return new Flow('start', false);
  }

  static fromSerialized(flow: any) {
    const flowToBuild = new Flow(flow.currentStep, flow.check)
    flowToBuild.exterior = flow.exterior
    flowToBuild.interior = flow.interior
    flowToBuild.details = flow.details
    flowToBuild.blemishes = flow.blemishes
    return flowToBuild;
  }
}
