import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ElevesService } from 'src/app/services/eleves.service';
import { ServiceCategorieService } from 'src/app/services/service-categorie.service';

@Component({
  selector: 'app-detail-eleve',
  templateUrl: './detail-eleve.component.html',
  styleUrls: ['./detail-eleve.component.scss']
})
export class DetailEleveComponent implements OnInit {


  tailles = [5, 10, 25, 100]
  taille = 10;
  page: number = 1
  totalLength!: number
  recherche!: any
  eleves: any
  i: number = 0;
  errorModif!: boolean
  categories!: any[];
  codeGeographique!: any[]
  medicaments: any[] = [];
  formes!: any[]
  meds: any[] = [];
  isModify: boolean = false;
  dateLime: any = Date.now()
  modification: boolean = false
  errorLib!: boolean

  parentId!: number

  parcours: any
  parents: any

  isLoading: boolean = true
  isHistory: boolean = true
  services: any
  historique: any

  formG = new FormGroup({
    service: new FormControl('', [Validators.required]),
    mois: new FormControl('', [Validators.required]),
  })
  id: number = this.router.snapshot.params['id']

  constructor(private el: ElevesService, private router: ActivatedRoute, private sv: ServiceCategorieService) { }

  ngOnInit(): void {
    this.initForm()

    this.el.getOneEleve(this.id).then(res => {
      this.eleves = res
      this.isLoading = false
    })

    this.el.getParcours(this.id).then(res => {
      this.parcours = res
    })

    this.sv.getAllService().subscribe(res => {
      this.services = res
    })

    this.getAllHistorique()
  }

  getAllHistorique() {
    this.el.getHistorique(this.id).then(res => {
      this.historique = res
      this.isHistory = false
    })
  }
  changerPage(event: number) {
    this.page = event
  }

  changerTaille(event: any) {
    this.taille = event.target.value
    this.page = 1
  }

  changer() {
    this.page = 1
  }

  modifier() {

    const donnees = {
      serviceId: this.formG.value['service'],
      mois: this.formG.value['mois'],
      eleveId: this.id,

    }

    this.el.addPaiement(donnees).subscribe((reponse: any) => {
     this.getAllHistorique()
     this.formG.reset()
    })

  }

  initForm() {
    this.formG
  }
}
