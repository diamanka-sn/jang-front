import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/model/config';

@Injectable({
  providedIn: 'root'
})
export class EnvoieService {

 
  subenv = new Subject<any[]>()


  constructor(private http: HttpClient) { }

  envoi(lien: String, donnees: any) {
    return this.http.post(`${config.apiUrl}/${lien}`, donnees, { headers: headers });
  }

  recuperer(lien: String) {
    return this.http.get<any>(`${config.apiUrl}/${lien}`, { headers: headers })
  }

  modifier(lien: String, donnees: any) {
    return this.http.put(`${config.apiUrl}/${lien}`, donnees, { headers: headers });

  }

  supprimer(lien: String) {
    return this.http.delete(`${config.apiUrl}/${lien}`, { headers: headers })
  }
}
