import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Addresses} from "../model/Addresses";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  URL: string = 'https://api-adresse.data.gouv.fr/search/?q='
  constructor(private http: HttpClient) { }

  getAddress(address: string): Observable<Addresses[]> {
    address = address.replace(/ /g , '+')
    return this.http.get<any>(this.URL + address + "&limit=10").pipe(
      map(data => data.features.map((item: any) => ({
        label: item.properties.label,
        score: item.properties.score,
        housenumber: item.properties.housenumber,
        id: item.properties.id,
        name: item.properties.name,
        postcode: item.properties.postcode,
        citycode: item.properties.citycode,
        x: item.properties.x,
        y: item.properties.y,
        city: item.properties.city,
        district: item.properties.district,
        context: item.properties.context,
        type: item.properties.type,
        importance: item.properties.importance,
        street: item.properties.street
      })))
    );
  }
}
