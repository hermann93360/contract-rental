import {Component, ElementRef, ViewChild} from '@angular/core';
import {MqttService} from "../services/mqtt.service";
declare var ImageCapture: any;
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'contract-location';
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  @ViewChild('canvasElement') canvasElement: ElementRef | undefined;
  @ViewChild('photoElement') photoElement: ElementRef | undefined;

  mediaStream: MediaStream | undefined;
  imageCapture: any
  erreur: any;
  flashEnabled: boolean = true; // État de la lampe torche


  constructor() {
    this.connect();
    //this.startCamera();
  }

  connect() {
    //this.websocketService.connect('http://localhost:8080/websocket');
  }

  disconnect() {
    //this.websocketService.disconnect();
  }

  sendMessage() {
    //this.websocketService.sendMessage('/app/your-endpoint', { text: 'Hello from Angular!' });
  }
}
