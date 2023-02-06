import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/model/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategorieService {

  constructor(private http: HttpClient,private bd: EnvoieService) { }

  getAllService(){
    return this.http.get<any[]>(`${config.apiUrl}/service`)
  }

  getAllCategorie(){
    return this.http.get<any[]>(`${config.apiUrl}/categorie`)
  }

  addService(donnees:any){
    return this.http.post(`${config.apiUrl}/service`,donnees);
  }

  changeStatus(id:number,donnees:any){
    return this.http.post(`${config.apiUrl}/service/s/`+id,donnees);
  }

 
  modifyDepense(id: number, depense: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`service/` + id, depense).subscribe(
          (response) => {
            resolve(response)
          },
          (err) => {
            reject(err)
          }
        )
      }
    )
  }

  deleteService(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`service/` + id).subscribe(
          (response) => {
            resolve(response)
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }

  getChiffre() {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`service/ca`).subscribe((medicament => {
        resolve(medicament[0])
      }),
        (error) => {
          reject(error)
        })
    })
  }

}
