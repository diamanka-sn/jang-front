import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { InformationPersonnelleService } from 'src/app/services/information-personnelle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  utilisateur: any

  constructor(    private servinfo: InformationPersonnelleService, private serveU:AuthentificationService) { }

  ngOnInit(): void {
    this.servinfo.subinfo.subscribe(data => {
      this.utilisateur = data
    })
    this.servinfo.getInfo()
  }

}
