import { Component, OnInit } from '@angular/core';
import { DepensesService } from 'src/app/services/depenses.service';
import { ElevesService } from 'src/app/services/eleves.service';
import { ServiceCategorieService } from 'src/app/services/service-categorie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  services: any
  depenses: any
  coutS: number = 0
  nombreS: number = 0
  nombreE:number = 0
  coutD:number = 0
  constructor(private el: ElevesService, private sv: ServiceCategorieService, private dp:DepensesService) { }

  ngOnInit(): void {
    this.sv.getAllService().subscribe(res => {
      this.nombreS = res.length
    })

    this.sv.getChiffre().then(res => {
      this.services = res
      for (let i = 0; i < this.services.length; i++) {

        this.coutS += parseInt(this.services[i].cout)
      }
    })

    this.el.getAllEleves().subscribe(res=>{
      this.nombreE = res.length
    })

    this.dp.getChiffre().then(res=>{
      this.depenses = res

      for (let i = 0; i < this.depenses.length; i++) {

        this.coutD += parseInt(this.depenses[i].montant)
      }
    })
  }

}
