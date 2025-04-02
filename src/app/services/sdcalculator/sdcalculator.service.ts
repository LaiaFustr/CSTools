import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdcalculatorService {

  private indexCarrier = 'http://localhost:8000/api/v1/indexCarrier';
  private indexPort = 'http://localhost:8000/api/v1/indexPort';
  private portswherecarrier = 'http://localhost:8000/api/v1/portswherecarrier/{carrier}';
  private carrierswhereport = 'http://localhost:8000/api/v1/carrierswhereport/{port}';
  private calculation = 'http://localhost:8000/api/v1/calculo';

  constructor(private http: HttpClient) { }

  getIndexCarrier(): Observable<any[]> {
    return this.http.get<any[]>(this.indexCarrier);
  }
  getIndexPort(): Observable<any[]> {
    return this.http.get<any[]>(this.indexPort);
  }
  getPortsWhereCarrier(carrier: string): Observable<any[]> {
    return this.http.get<any[]>(this.portswherecarrier.replace('{carrier}', carrier));
  }
  getCarriersWherePort(port: string): Observable<any[]> {
    return this.http.get<any[]>(this.carrierswhereport.replace('{port}', port));
  }

  getCalculation(vessel_arrival: Date, gate_out_full: Date, gate_in_empty: Date, carrier: string, port: string, container: Number, free_storage: Number, free_demurrage: Number): Observable<any> {
    const params = { vessel_arrival, gate_out_full, gate_in_empty, carrier, port, container, free_storage, free_demurrage };
    return this.http.post<any>(this.calculation, params);
  }
}
