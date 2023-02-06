import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';
import { GetTokenService } from './services/get-token.service';
import { InformationPersonnelleService } from './services/information-personnelle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  title = 'jang | Connexion';
}
