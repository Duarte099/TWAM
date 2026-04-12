import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JogadorService {
  private apiUrl = 'https://69c2f4827518bf8facbfe998.mockapi.io/api/v1/';

  constructor(private http: HttpClient) {}

  getJogadores() {
    return this.http.get<any[]>(this.apiUrl + 'Players');
  }

  getJogador(id: string) {
    return this.http.get<any[]>(this.apiUrl + 'Players/' + id);
  }

  deleteJogador(id: string) {
    return this.http.delete<any[]>(this.apiUrl + 'Players/' + id);
  }

  createJogador(data: any) {
    return this.http.post(this.apiUrl + 'Players', data);
  }

  updateJogador(id: string, data: any) {
    return this.http.put(this.apiUrl + 'Players/' + id, data);
  }
}
