import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {


  isAuth: boolean = false
  isLoading: boolean = false
  erreur: boolean = false
  error!: any
  errorM!: any
  // formGroup!: FormGroup
  formGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required, Validators.maxLength(100)]),

  })

  constructor(private routes: Router, private form: FormBuilder,
    private servicaut: AuthentificationService,
  ) {

  }


  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup

  }

  submit() {
    this.isLoading = true;
    const login = this.formGroup.value['login']
    const mp = this.formGroup.value['motDePasse']
    setTimeout(() => {

      this.servicaut.connexion(login, mp).then((user: any) => {
        if (user.err) {
          this.isAuth = true
          this.isLoading = false;
          return
        }

        this.isAuth = false
        this.isLoading = false;
        const utilisateur = {
          nom: user.utilisateur.prenom + " " + user.utilisateur.nom,
          email: user.utilisateur.email,
          telephone: user.utilisateur.telephone,
          adresse: user.utilisateur.adresse

        }
        const roleuser = user.utilisateur.profile
        localStorage.setItem('807605274673228623802113__luxdev-access-token', user.token)
        localStorage.setItem('user', JSON.stringify(utilisateur))
        localStorage.setItem('roleuser', JSON.stringify(roleuser))

        switch (user.utilisateur.profile) {
          case 'admin':
            this.routes.navigate(['/espace'])
            break;
        }
        return
      })
        .catch(err => {
          this.error = err.error
          this.erreur = true
          this.errorM = this.error.error
          this.isLoading = false
          console.log(this.errorM)
        })
    }, 2000)
  }

}
