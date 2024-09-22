import { Injectable } from '@angular/core';
import mqtt from 'mqtt';
import {IClientOptions} from "mqtt/src/lib/client";
import {MqttClient} from "mqtt";


@Injectable({
  providedIn: 'root'
})
export class MqttService {

  private client: MqttClient;
  constructor() {
    const options: IClientOptions = {
      host: '94.23.12.188',
      port: 1886,
      protocol: 'mqtt',
      clientId: 'clientId_' + Math.random().toString(16).substr(2, 8),
      username: 'manyevents_4ec037df',
      password: 'a57a65568865a968',
    };

    this.client = mqtt.connect(options);

    this.client.on('connect', () => {
      console.log('Connecté au serveur MQTT!');
      this.client.subscribe("dcar_out/<UIN_BOARD>/response");
    });

    this.client.on('message', (topic, message) => {
      console.log(`Message reçu sous le topic ${topic}: ${message.toString()}`);
    });

    this.client.on('error', (err) => {
      console.error('Erreur de connexion:', err);
    });
  }

  sendDataToTopic(topic: string, data: any) {
    const jsonData = JSON.stringify(data); // Convertir les données en JSON

    this.client.publish(topic, jsonData, { qos: 1 }, (error) => {
      if (error) {
        console.error('Erreur lors de la publication des données:', error);
      } else {
        console.log('Données publiées avec succès sur le topic:', topic);
      }
    });
  }
}


