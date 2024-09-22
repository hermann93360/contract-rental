export enum ExteriorName{
  front = 0,
  rightFront = 1,
  driverFrontTireSide = 2,
  driverDoorSide = 3,
  driverRearDoorSide = 4,
  driverRearTireSide = 5,
  rightRear = 6,
  rear = 7,
  leftRear = 8,
  passengerRearTireSide = 9,
  passengerRearDoorSide = 10,
  passengerFrontDoorSide = 11,
  passengerFrontTireSide = 12,
  leftFront = 13,
  carRoof = 14
}

export enum InteriorName{
  ScreenSide = 0,
  centralSide = 1,
  wheelingSide = 2,
  driverDoor = 3,
  driverRearDoor = 4,
  passengerRearDoor = 5,
  passengerDoor = 6,
  driverSeat = 7,
  driverMat = 8,
  PassengerSeat = 9,
  passengerMat = 10,
  driverRearSeat = 11,
  driverRearMat = 12,
  passengerRearSeat = 13,
  passengerRearMat = 14
}

export enum DetailsName{
  odometers = 0,
  fuel = 1,
}

export interface Exterior{
  photos: Blob[]
  photosAsString: string[]
  photosAsObject?: Image[]
}

export interface Image {
  path?: string
  id?: string
  blob?: Blob
}

export interface Interior{
  photos: Blob[],
  photosAsString: string[]
  photosAsObject?: Image[]
}

export interface Details{
  odometers?: string,
  fuel?: string
}

export interface Blemishes{
  photos?: string[]
}
