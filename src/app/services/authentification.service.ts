import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { config, headers, nom } from 'src/model/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

 
  isAuth: boolean = false
  subjauth = new Subject<boolean>()
  constructor(private routes: Router, private http: HttpClient, private bd: EnvoieService) { }

  connexion(login: string, mp: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`${config.apiUrl}/utilisateur/login/`, { email: login, password: mp }, {
        headers: headers
      }).subscribe((user) => {
        resolve(user)
      }, (error) => {

        reject(error)
      })
    })

  }

  inscription(donnees: any) {
    return this.http.post(`${config.apiUrl}/utilisateur`, donnees);
  } 

  getToken() {
    if (localStorage.getItem('token') !== null) {
      this.isAuth = true
    }
    else {
      this.isAuth = false
      localStorage.clear()
    }
  }
  modifierMp(donnees: any) {
    const email = nom().email
    return new Promise((resolv, reject) => {
      this.bd.envoi('utilisateur/modifierMp/' + email, donnees).subscribe(d => {
        resolv(d)

      }, (err) => {
        reject(err)
      })
    })
  }
  
}
