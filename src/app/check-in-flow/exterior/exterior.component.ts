import { Component } from '@angular/core';
import {CardInfoComponent} from "../card-info/card-info.component";
import {CameraComponent} from "../camera/camera.component";
import {Exterior, Image} from "../../../model/CheckPhotos";
import {CheckInService} from "../../../services/check-in.service";
import {PhotosCheckComponent} from "../photos-check/photos-check.component";

@Component({
  selector: 'app-exterior',
  standalone: true,
  imports: [
    CardInfoComponent,
    CameraComponent,
    PhotosCheckComponent
  ],
  templateUrl: './exterior.component.html',
  styleUrl: './exterior.component.scss'
})
export class ExteriorComponent {

}
