import {AfterViewInit, Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements AfterViewInit{
  @Input()
  public startComponent: boolean = true;

  @Input()
  public center = { lat: 48.8566, lng: 2.3522 };

  public currentLocation: any;

  public zoom = 15;
  public options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    rotateControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
    scaleControl: false,
    styles:[
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9c9c9c"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7b7b7b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c8d7d4"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#070707"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ]
  };

  @ViewChild(GoogleMap, { static: false })
  public map: GoogleMap | undefined;
  public directionsService = new google.maps.DirectionsService();
  public directionsRenderer = new google.maps.DirectionsRenderer();
  public markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '../../assets/images/circle-marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };

  constructor() {
  }

  ngAfterViewInit(): void {
    this.getUserLocation();
    /*
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      preserveViewport: true
    });
    if(this.map?.googleMap){
      this.directionsRenderer.setMap(this.map.googleMap);
    }

     */
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: { lat: this.currentLocation.lat, lng: this.currentLocation.lng },
      destination: this.center,  // Destination
      travelMode: google.maps.TravelMode.WALKING
    }, (response, status) => {
      if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, (error) => {
        console.error('Error watching position: ', error);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

}
