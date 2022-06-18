import { Component, OnInit } from '@angular/core';
import {markerProvider} from "../providers/markersProviders";

 
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit {

  listaMarcadores: any = [];  

  constructor(private    marker : markerProvider) {
    this.obtenerMarcadores();
  }

  ngOnInit(): void {

  }


  async obtenerMarcadores(){          
    this.marker.getMarcadores().subscribe((data) =>{    
      if(data.ok){
        this.listaMarcadores = data.listaMarcadores;  

      }
      else{
        alert(data.error);
      }
    })
  }

}
