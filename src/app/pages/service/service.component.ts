import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParentService } from 'src/app/services/parent.service';
import { ServiceCategorieService } from 'src/app/services/service-categorie.service';
import { parentEleve } from 'src/model/Parent';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  erreurChange!: boolean
  test: number = 0
  erreurmodif!: boolean
  modif: any
  tailles = [5, 10, 25, 100]
  taille = 10;
  page: number = 1
  totalLength!: number
  recherche!: any
  services: any
  parents: Array<parentEleve> = []
  i: number = 0;
  change: any
  formLot!: FormGroup
  categories!: any[];
  codeGeographique!: any[]
  medicaments: any[] = [];
  formes!: any[]
  meds: any[] = [];
  isModify: boolean = false;
  dateLime: any = Date.now()
  modification: boolean = false
  errorLib!: boolean
  serviceid!: number
  serv: any[] = []
  formGroup = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    cout: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    categorie: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    libelle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  })
  constructor(private service: ServiceCategorieService, private ps: ParentService) { }

  ngOnInit(): void {
    this.recherche = new FormControl('')
    this.initForm()
    this.service.getAllCategorie().subscribe(res => {
      this.categories = res
    })
    this.getAllService()
  }

  initForm() {
    this.formGroup

  }
  getAllService() {
    this.service.getAllService().subscribe(res => {
      this.serv = res
      this.services = res
      this.totalLength = this.serv.length
      console.log(res)
    })
  }

  changerPage(event: any) {
    this.page = event
  }

  changerTaille(event: any) {
    this.taille = event.target.value
    this.page = 1
  }

  changer() {
    console.log(this.recherche.value)
    this.page = 1
    return this.services = this.serv.filter(m => m.libelle.toLowerCase().indexOf(this.recherche.value.toLowerCase()) > -1)
  }
  // sendData(event: any) {
  //   let query:any = event.target.value
  //   // let matchSpace:any
  //   this.ps.searchParent(query.trim()).subscribe(res => {
  //     console.log(res)
  //   })
  // }

  annuler() {
    this.modification = false
    this.formGroup.reset()
    $('#exampleModal').modal('hide')
    // $('#exampleModal').hide()
  }
  submit() {
    const libelle = this.formGroup.get('libelle')?.value
    const cout = this.formGroup.get('cout')?.value
    const description = this.formGroup.get('description')?.value
    const categorie = this.formGroup.get('categorie')?.value
    console.log(categorie)

    const service = {
      libelle: libelle,
      cout: cout,
      description: description,
      categorie: categorie
    }
    if (!this.isModify) {
      this.service.addService(service)
        .subscribe(
          (res: any) => {
            if (res.erreur) {
              this.errorLib = true
              console.log(res.erreur)
              return
            }
            this.isModify = false;
            this.formGroup.reset();
            $("#exampleModal").modal("hide");
            this.getAllService()
          }
        )
    } else {
      this.service.modifyDepense(this.serviceid, service).then((res) => {
        this.modif = res
        // if(res.erreur)
        this.getAllService();

        $("#exampleModal").modal("hide");
        this.serviceid = 0
        this.formGroup.reset()
      })
    }

  }

  modifier(d: any) {
    var result = confirm("Voulez-vous modifier : " + d.libelle + " ?");
    if (result) {
      this.isModify = true;
      this.serviceid = d.id
      this.formGroup.patchValue({
        description: d.description,
        cout: d.cout,
        libelle: d.libelle,
        categorie: d.Categorie.libelle

      });
      $("#exampleModal").modal("show");
    }
  }

  afficherButtonSave() {
    this.formGroup.reset();
    this.isModify = false;
    $('#exampleModal').modal('show');
  }

  changerStatus(id: number, s: number) {
    const service = {
      id: id,
      status: s
    }
    var status = ""
    if (s == 0) {
      status += "désactiver"
    } else {
      status += "activer"
    }

    var result = confirm("Voulez-vous " + status + " ce service?");
    if (result) {
      this.service.changeStatus(id, service)
        .subscribe(
          (res: any) => {
            this.change = res
            if (res.erreur) {
              this.erreurChange = true
              this.i = 1
              this.getAllService()
            } else {
              this.erreurChange = false
              this.i = 1
              this.getAllService()
            }
          }
        )
    }
  }

  supprimer(d: number) {
    var result = confirm("Voulez-vous supprimer ?");
    if (result) {
      this.service.deleteService(d)
        .then(
          () => {
            this.getAllService();
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )
    }

  }

  Rechercher(){
    if(this.recherche == ""){
      this.getAllService()
    } else {
      this.services = this.services.filter((res: { libelle: string; })=> {
        return res.libelle.toLocaleLowerCase().match(this.recherche.toLocaleLowerCase())
      })
    }
  }

  key:string = 'libelle'
  reverse:boolean = false

  Trier(key:any){
    this.key = key
    this.reverse = !this.reverse
  }
}
