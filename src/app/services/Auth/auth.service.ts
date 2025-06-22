import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private loginUser = 'http://localhost:8000/api/v1/login';
  /* 
    login(email: string, password: string, data?: any): Observable<any> {
      // const params = new HttpParams().set('email', email).set('password', password); 
      const url = `${this.loginUser}?email=${email}&password=${password}`;
      return this.http.post<any[]>(url, data);
    } */

  getAuthToken() {
    return sessionStorage.getItem('jwt');
  }
  async login(email: string, password: string, data?: any): Promise<any> {
    const url = `${this.loginUser}?email=${email}&password=${password}`;
    return await firstValueFrom(this.http.post<any[]>(url, data));
  }

  registerUser() {
    /* this.sdcalculator.getCarriersWherePort(this.port)
      .subscribe(data => {
      } */
    // constructor() { }
  }

  //hacer logout y que llame al servicio logout para que destroce token
  logout(){
    
  }

}