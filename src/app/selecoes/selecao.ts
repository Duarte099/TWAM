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

  getSelecao(id:string) {
    return this.http.get<any[]>(this.apiUrl + "Teams/" + id);
  }
  createSelecao(data:any) {
    return this.http.post<any[]>(this.apiUrl + "Teams/", data);
  }
  updateSelecao(id:string,data:any){
    return this.http.put<any[]>(this.apiUrl + "Teams/"+id,data);
  }
  deleteSelecao(id:string){
    return this.http.delete<any[]>(this.apiUrl + "Teams/"+id)
  }
}
