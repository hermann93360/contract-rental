import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarBoxService {

  private geocoder: any;
  public coordinates: BehaviorSubject<google.maps.LatLngLiteral> = new BehaviorSubject({ lat: 48.666666, lng: 2.777777 });
  public address: BehaviorSubject<string> = new BehaviorSubject("");
  constructor() {
    this.geocoder = new google.maps.Geocoder();
    this.getCarData().subscribe((data) => {
      this.coordinates.next(data);
      this.patchAddress(data)
        .then(address => this.address.next(address))
        .catch(error => console.error(error));
    })

  }

  private getCarData() {
    //repalce by call on back end
    return new BehaviorSubject<google.maps.LatLngLiteral>({ lat: 48.855309, lng: 2.511848 })
  }

  patchAddress(coordinates: google.maps.LatLngLiteral): Promise<string> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ 'location': coordinates }, (results: { formatted_address: string | PromiseLike<string>; }[], status: string) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
