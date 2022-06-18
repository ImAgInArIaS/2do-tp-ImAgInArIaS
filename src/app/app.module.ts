import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsmapComponent } from './jsmap/jsmap.component';
import { MappositionComponent } from './mapposition/mapposition.component';

import {markerProvider} from "../../../jsapi-angular/src/app/providers/markersProviders";
import {HttpClientModule} from "@angular/common/http";
import { MarcadoresComponent } from './marcadores/marcadores.component'


@NgModule({
  declarations: [
    AppComponent,
    JsmapComponent,
    MappositionComponent,
    MarcadoresComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [markerProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }