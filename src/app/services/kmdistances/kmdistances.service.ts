import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KmdistancesService {


  private localports = 'http://localhost:8000/api/v1/ports';
  private countries = 'http://localhost:8000/api/v1/countries';
private localPC = 'http://localhost:8000/api/v1/pcbycountry';
private distance = 'http://localhost:8000/api/v1/distance';


  constructor(private http: HttpClient) { }


  getCountry(): Observable<any[]> {
   
    return this.http.get<any[]>(this.countries);
  }

  getLocalPC(country: string): Observable<any[]> {
    const params = new HttpParams().set('country', country);
    return this.http.get<any[]>(this.localPC, { params });
  }

  getLocalPorts(): Observable<any[]> {

    return this.http.get<any[]>(this.localports);
  }

  getDistance(oricountry: string,oriiso : string, descountry: string,desiso: string, oripc: string, despc: string/* , oritown:string, destown: string */){
    const params = {oricountry ,oriiso, descountry, desiso,  oripc, despc/* , oritown,  destown */ };
    return this.http.post<any>(this.distance, params);
  }
}
