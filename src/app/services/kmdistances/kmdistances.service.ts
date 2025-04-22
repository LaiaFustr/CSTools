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


  constructor(private http: HttpClient) { }


  getCountry(): Observable<any[]> {
   
    return this.http.get<any[]>(this.countries);
  }

  getLocalPC(country: string): Observable<any[]> {
    const params = new HttpParams().set('country', country);
    return this.http.get<any[]>(this.localports, { params });
  }

  getLocalPorts(): Observable<any[]> {

    return this.http.get<any[]>(this.localports);
  }

  getDistance(){
    
  }
}
