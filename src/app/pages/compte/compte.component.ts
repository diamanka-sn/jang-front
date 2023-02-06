import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { InformationPersonnelleService } from 'src/app/services/information-personnelle.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  subutilisateur!: Subscription;
  errorEmail: boolean = false
  errorTelephone: boolean = false
  utilisateur: any
  info!: Subscription

  erreurTelephone: boolean = false
  erreurEmail: boolean = false
  submitErr: boolean = false
  erreurPassword: boolean = false
  i:number = 0;
  serviceclient!: Subscription
  constructor(
    private servinfo: InformationPersonnelleService, private serveU:AuthentificationService
  ) { }
  isAuth = false
  formG = new FormGroup({
    ancien: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    nouveau: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    confirmer: new FormControl('', [Validators.required, Validators.maxLength(100), (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value) {
        if (c.value !== this.formG.value['nouveau']) {
          return { 'errorMp': true }
        }
      }
      return null
    }]),
  })
  ngOnInit(): void {
  
    this.initForm()
    this.servinfo.subinfo.subscribe(data => {
      this.utilisateur = data
    })
    this.servinfo.getInfo()
    //$('#lerte').hide()
  }
  modifier() {

    const donnees = {
      ancien: this.formG.value['ancien'],
      nouveau: this.formG.value['nouveau'],
      confirmer: this.formG.value['confirmer'],

    }

    this.serveU.modifierMp(donnees).then((reponse: any) => {
      if (reponse.error) {
        this.erreurPassword = true
      }
      else {
        this.i = 1
        this.erreurPassword = false
        this.formG.reset()
      }
    })

  }

  initForm() {
    this.formG
  }

}
