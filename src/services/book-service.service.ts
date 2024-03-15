import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUpload} from "../model/FileUpload";
import {finalize, Observable} from "rxjs";
import firebase from "firebase/compat";
import UploadTask = firebase.storage.UploadTask;

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private basePath = '/uploads';

  constructor(private database: AngularFirestore, private storage: AngularFireStorage) { }

  uploadFile(fileUpload: FileUpload) {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload).then(docRef => {
              resolve(docRef.id);
            }).catch(error => reject(error));
          }, error => reject(error));
        })
      ).subscribe();
    });

  }

  saveFileData(fileUpload: FileUpload) {
    const fileData = fileUpload.getFileUploadForSave()
    return this.database.collection('file').add(fileData);
  }
}
