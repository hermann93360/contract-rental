import { Component } from '@angular/core';
import {PhotosCheckComponent} from "../photos-check/photos-check.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    PhotosCheckComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

}
