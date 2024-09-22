import { Component } from '@angular/core';
import {CameraComponent} from "../camera/camera.component";
import {CardInfoComponent} from "../card-info/card-info.component";
import {Exterior, Image, Interior} from "../../../model/CheckPhotos";
import {CheckInService} from "../../../services/check-in.service";
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

  public camera: boolean = false;
  public interior!: Interior
  public images: Image[] = []

  constructor(private checkInService: CheckInService) {
    this.checkInService.getPhotos('interior').subscribe((images) => {
      this.images = images;
    })
  }
  getPhotosAndClose(images: Image[]) {
    this.camera = false
    this.checkInService.addPhotos(images, 'interior');
  }

  displayCamera() {
    this.camera = true;
  }

  getCheckPage(){
    return this.images.length != 0;
  }

}
