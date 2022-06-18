import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import Swal from 'sweetalert2';
import { markerProvider } from '../providers/markersProviders';


@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css']
})
export class JsmapComponent {

  private map?: H.Map;

  list: any = [];

  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;

  @ViewChild('map') mapDiv?: ElementRef; 
  constructor(private markers: markerProvider) {

  }
  //get marcadore esto viene de la api...
  getMarcador() {
    this.markers.getMarcadores().subscribe((data) => {    
      if (data.ok) {
        this.list = data.listaMarcadores;  
        this.agregarMarcador();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Si lee esto tus benditos marcadores se cargaron bien!! Profe, sabe lo que me costo hacer esto? ',
          showConfirmButton: false,
          timer: 10000
        });
      }
      else {
        alert(data.error);
      }
    })

  }
  agregarMarcador() {

    for (var i = 0; i < this.list.length; i++){
      var var1 = new H.map.Marker({ lat: this.list[i].latitud, lng: this.list[i].longitud });
    this.map?.addObject(var1);
    }  

  }

  private timeoutHandle: any;
  @Output() notify = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = setTimeout(() => {
        if (this.map) {
          if (changes['zoom'] !== undefined) {
            this.map.setZoom(changes['zoom'].currentValue);
          }
          if (changes['lat'] !== undefined) {
            this.map.setCenter({lat: changes['lat'].currentValue, lng: this.lng});
          }
          if (changes['lng'] !== undefined) {
            this.map.setCenter({lat: this.lat, lng: changes['lng'].currentValue});
          }
        }
      }, 100);
  }


  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: "54TGgLTLIjZJR0LIBK9UvJLSmn40MhQJlTxBNJnRaf4"
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: -31.41, lng: -64.12}, 
          zoom: 11,
        },
      );
      var parisMarker = new H.map.Marker({lat:48.8567, lng:2.3508}); //con amor para el profe
      map.addObject(parisMarker);
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
      map.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
        this.notify.emit(ev)
      });
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      
    }

  }
  ngOnInit(): void {
    this.getMarcador();
  }
}
