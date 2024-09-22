import {Injectable} from '@angular/core';
import {finalize, map, Observable} from "rxjs";
import {Exterior, Image, ExteriorName, InteriorName, DetailsName} from "../model/CheckPhotos";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Car} from "../model/Car";
import {Book} from "../model/Book";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private database: AngularFirestore, private storage: AngularFireStorage) {
  }

  uploadCarPhotos(images: Image[], contractId: string, type: string, carSupport: string) {
    for (let indice = 0; indice < images.length; indice++) {
      console.log(images[indice].blob)
      const filePath = this.getFilePath(type, indice);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, images[indice].blob);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.saveFileData(url, contractId, type, carSupport, indice);
          });
        })
      ).subscribe();
    }
  }

  private getFilePath(type: string, indice: number) {
    switch (type) {
      case "exterior" :
        return `upload/${Date.now()}_car_${ExteriorName[indice]}.jpeg`;
      case "interior" :
        return `upload/${Date.now()}_car_${InteriorName[indice]}.jpeg`;
      case "details" :
        return `upload/${Date.now()}_car_${DetailsName[indice]}.jpeg`;
      case "blemishes" :
        return `upload/${Date.now()}_car_blemishes${indice}.jpeg`;
    }
    return "";
  }

  getCarPhotos(contractId: string, type: string, carSupport: string): Observable<Image[]> {
    return this.database
      .collection('file', ref => ref
        .where('contractId', '==', contractId)
        .where('carSupport', '==', carSupport)
        .where('type', '==', type))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return {id: id, path: data.url}
        })),
      );
  }

  getContract(contractId: string): Observable<Book | undefined> {
    return this.database
      .doc(`contract/${contractId}`)
      .snapshotChanges()
      .pipe(map(action => {
          const data = action.payload.data() as any;
          if(data){
            const id = action.payload.id;
            return {contractId: id, carSupport: data.carSupport}
          }
          return undefined;
        })
      );
  }

  updateContractSupport(contractId: string, newCarSupport: string): Promise<void> {
    return this.database.collection("contract").doc(contractId).update({
      carSupport: newCarSupport
    });
  }

  private saveFileData(url: string, contractId: string, type: string, carSupport?: string, indice?: number) {
    const data = {contractId: contractId, type: type, url: url, time: new Date(), indice: indice, carSupport: carSupport};
    return this.database.collection('file').add(data);
  }
}
