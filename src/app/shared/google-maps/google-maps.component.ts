import { Component, Input } from '@angular/core';

@Component({
  selector: 'google-maps',
  templateUrl: 'google-maps.component.html',
  styleUrls: ['google-maps.component.css'],
})
export class GoogleMapsComponent {
  title: string = '';
 @Input() lat: number = 37.431489;
 @Input() lng: number = -122.163719;
 @Input() zoom: number = 11;
  @Input()
  markers: Marker[] = [
   
    
  ];
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title: string;
  www: string;
}
