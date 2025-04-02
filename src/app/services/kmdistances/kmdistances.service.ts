import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KmdistancesService {


  private localportspc = '';
  private countries = 'http://localhost:8000/api/v1/countries';


  constructor(private http: HttpClient) { }



  getCountry(): Observable<any[]> {
    /* const countrifake =  */;

   /*  return [
      { papaicod: 'US', papainom: 'United States' },
      {  papaicod: 'CN', papainom: 'China' },
      {  papaicod: 'DE', papainom: 'Germany' },
      {  papaicod: 'FR', papainom: 'France' },
      {  papaicod: 'BR', papainom: 'Brazil' }
    ]; */
    return this.http.get<any[]>(this.countries);
  }

  getLocalPortsPC(country: string): Observable<any[]> {
    const params = new HttpParams().set('country', country);
    return this.http.get<any[]>(this.localportspc, { params });
  }

  getDistance(){
    
  }
}
