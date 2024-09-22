import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {Observable} from "rxjs";
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: any;

  constructor() {
  }

  connect(url: string) {
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    console.log("jme conn")
    this.stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
      this.subscribe('/topic/someTopic');
    });
  }

  subscribe(topic: string) {
    this.stompClient.subscribe(topic, (message: { body: string; }) => {
      console.log(JSON.parse(message.body));
    });
  }

  sendMessage(destination: string, message: any) {
    this.stompClient.send(destination, {}, JSON.stringify(message));
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }
}
