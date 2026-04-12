import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SelecaoService {
  private apiUrl = 'https://69c2f4827518bf8facbfe998.mockapi.io/api/v1/';

  constructor(private http: HttpClient) {}

  getSelecoes() {
    return this.http.get<any[]>(this.apiUrl + "Teams");
  }
}
