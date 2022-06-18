import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from "rxjs";


@Injectable()
export class markerProvider{

    apiUrlBase: string = environment.urlBaseApi; 

    constructor(private http: HttpClient){ 

    }

    getMarcadores(): Observable<any>{              
        const url = this.apiUrlBase + "api/geolocalizacion/GetMarcadores"; // necesito la API DEL PROFE!!!!! (apuesto que 100 U$S que la pasa el domingo a la noche)
        const headers = {"content-type": "application/json"};
        return this.http.get(url, {"headers":headers});
    }



}