import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdcalculatorService {

  private indexCarrier = 'http://localhost:8000/api/v1/indexCarrier';
  private indexPort = 'http://localhost:8000/api/v1/indexPort';

  constructor(private http: HttpClient) { }

  getIndexCarrier(): Observable<any[]> {
    return this.http.get<any[]>(this.indexCarrier);
  }
  getIndexPort(): Observable<any[]> {
    return this.http.get<any[]>(this.indexPort);
  }
}
