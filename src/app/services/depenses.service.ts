import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/model/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {

  constructor(private http: HttpClient,private bd: EnvoieService) { }

  getAllDepense(){
    return this.http.get<any[]>(`${config.apiUrl}/depense`)
  }

  addDepense(donnees:any){
    return this.http.post(`${config.apiUrl}/depense`,donnees);
  }

  modifyOneDepense(id: number, depense: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`depense/` + id, depense).subscribe(
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


  getChiffre() {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`depense/c/`).subscribe((medicament => {
        resolve(medicament[0])
      }),
        (error) => {
          reject(error)
        })
    })
  }

  deleteOneDepense(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`depense/` + id).subscribe(
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
}
