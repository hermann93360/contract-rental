import { Component } from '@angular/core';
import {CameraComponent} from "../camera/camera.component";
import {CardInfoComponent} from "../card-info/card-info.component";
import {PhotosCheckComponent} from "../photos-check/photos-check.component";

@Component({
  selector: 'app-interior',
  standalone: true,
  imports: [
    CameraComponent,
    CardInfoComponent,
    PhotosCheckComponent
  ],
  templateUrl: './interior.component.html',
  styleUrl: './interior.component.scss'
})
export class InteriorComponent {


}
