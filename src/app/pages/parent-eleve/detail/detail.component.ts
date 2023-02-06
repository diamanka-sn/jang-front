import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElevesService } from 'src/app/services/eleves.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

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

  parents:any
  constructor( private pt:ElevesService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.params['id']
    this.pt.getOneParent(id).then((medicament) => {
      console.log(medicament)
      this.parents = medicament
      // console.log(medicament)
    })

    this.pt.getListeEleveOneParent(id).then(res=>{
     this.eleves = res
     console.log(res)
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
}
