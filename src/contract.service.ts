import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Booking} from "./model/Contract";
import {map, Observable} from "rxjs";
import {ContractComponent} from "./app/contract/contract.component";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private store: AngularFirestore) {
  }

  addContract(contract: Booking) {
    return this.store.collection('contract').add(contract);
  }

  getContractById(contractId: string):Observable<Booking | undefined> {
    return this.store.collection('contract').doc<Booking>(contractId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as any;
        const id = action.payload.id;
        data.start = new Date(data.start.seconds * 1000);
        data.end = new Date(data.end.seconds * 1000);
        return { id, ...data }; // combine l'ID et les données du document
      })
    );
  }

  getContractByIdentifier(identifier: string): Observable<Booking[]> {
    return this.store.collection<Booking>('contract', ref => ref.where('identifier', '==', identifier))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          data.start = new Date(data.start.seconds * 1000);
          data.end = new Date(data.end.seconds * 1000);
          return { id, ...data }; // combine l'ID et les données du document
        }))
      );
  }

  updateContract(contractId: string, updatedContract: Booking ){
    return this.store.collection('contract').doc(contractId).update(updatedContract)

  }
}
