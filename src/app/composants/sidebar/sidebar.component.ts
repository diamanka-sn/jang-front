import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTokenService } from 'src/app/services/get-token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private token: GetTokenService, private routes: Router) { }

  ngOnInit(): void {
  }
  deconnexion(){
    var result = confirm("Voulez-vous vous deconnecté ?");
    if (result) {
      this.token.supprimerToken()
      this.routes.navigate(['/'])
    }
  }
}
