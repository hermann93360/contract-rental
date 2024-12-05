import { Component } from '@angular/core';
import {BookingService} from "../../services/booking.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-cars',
  templateUrl: './create-cars.component.html',
  styleUrl: './create-cars.component.scss'
})
export class CreateCarsComponent {

  form!: FormGroup;
  selectedFiles: File[] = [];

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      docId: [],
      type: [],
    })
  }

  onFilesSelected(event: any) {
    // Récupère les fichiers sélectionnés
    const files: FileList = event.target.files;

    // Convertit FileList en tableau pour manipulation
    this.selectedFiles = Array.from(files);

    // Affiche les fichiers dans la console
    console.log('Fichiers sélectionnés :', this.selectedFiles);
  }

  send() {
    const values = this.form.value;
    console.log(values);
    console.log(this.selectedFiles);
    this.bookingService.addImages(values['docId'], this.selectedFiles, values['type']);
  }
}
