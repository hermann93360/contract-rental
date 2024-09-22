import {Component, Input, OnInit} from '@angular/core';
import {Exterior, Image} from "../../../model/CheckPhotos";
import {CheckInService} from "../../../services/check-in.service";
import {CameraComponent} from "../camera/camera.component";
import {CardInfoComponent} from "../card-info/card-info.component";

@Component({
  selector: 'app-photos-check',
  standalone: true,
  imports: [
    CameraComponent,
    CardInfoComponent
  ],
  templateUrl: './photos-check.component.html',
  styleUrl: './photos-check.component.scss'
})
export class PhotosCheckComponent implements OnInit{

  @Input()
  public type: string = ""
  public camera: boolean = false;
  public images: Image[] = []

  constructor(private checkInService: CheckInService) {
  }

  ngOnInit(): void {
    this.checkInService.getPhotos(this.type).subscribe((images) => {
      this.images = images;
    })
  }

  getPhotosAndClose(images: Image[]) {
    this.camera = false
    this.checkInService.addPhotos(images, this.type);
  }

  displayCamera() {
    this.camera = true;
  }

  getCheckPage() {
    return this.images.length != 0;
  }

  getMainTitle() {
    switch (this.type) {
      case "exterior" :
        return "de l'exterieur";
      case "interior" :
        return "de l'intérieur";
      case "details" :
        return "du kilométrage et de l'essence";
      case "blemishes" :
        return "des imperfections";
    }
    return "";

  }


}
