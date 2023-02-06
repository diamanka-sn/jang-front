import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/model/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {

  constructor(private http: HttpClient,private bd: EnvoieService) { }

  getAllEleves(){
    return this.http.get<any[]>(`${config.apiUrl}/eleve`)
  }

  addParent(donnees:any){
    return this.http.post(`${config.apiUrl}/parent`,donnees);
  }

  addEleve(donnees:any){
    return this.http.post(`${config.apiUrl}/eleve`,donnees);
  }

  addPaiement(donnees:any){
    return this.http.post(`${config.apiUrl}/eleve/paiement`,donnees);
  }

  getAllParent(){
    return this.http.get<any[]>(`${config.apiUrl}/parent`)
  }

  modifierParent(id: number, depense: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`parent/` + id, depense).subscribe(
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

  supprimerParent(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`parent/` + id).subscribe(
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

  supprimerEleve(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`eleve/` + id).subscribe(
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
  getOneParent(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`parent/` + id).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })
  }

  getOneEleve(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`eleve/` + id).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })
  }

  getParcours(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`eleve/pr/` + id).subscribe((medicament => {
        resolve(medicament[0])
      }),
        (error) => {
          reject(error)
        })
    })
  }

  getHistorique(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`eleve/h/` + id).subscribe((medicament => {
        resolve(medicament[0])
      }),
        (error) => {
          reject(error)
        })
    })
  }

  getListeEleveOneParent(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`eleve/p/` + id).subscribe((medicament => {
        resolve(medicament[0])
      }),
        (error) => {
          reject(error)
        })
    })
  }
}
