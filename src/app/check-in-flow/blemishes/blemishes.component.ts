import { Component } from '@angular/core';
import {PhotosCheckComponent} from "../photos-check/photos-check.component";

@Component({
  selector: 'app-blemishes',
  standalone: true,
    imports: [
        PhotosCheckComponent
    ],
  templateUrl: './blemishes.component.html',
  styleUrl: './blemishes.component.scss'
})
export class BlemishesComponent {

}
