import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElevesService } from 'src/app/services/eleves.service';
import { validationTelephone } from 'src/model/config';

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.scss']
})
export class ElevesComponent implements OnInit {
  tailles = [5, 10, 25, 100]
  taille = 10;
  page: number = 1
  totalLength!: number
  recherche!: any
  eleves: any
  i: number = 0;

  categories!: any[];
  codeGeographique!: any[]
  medicaments: any[] = [];
  formes!: any[]
  meds: any[] = [];
  isModify: boolean = false;
  dateLime: any = Date.now()
  modification: boolean = false
  errorLib!: boolean
  eleveId!:number

  erreurTelephone: boolean = false
  erreurEmail: boolean = false
  submitErr: boolean = false

  formGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    sexe: new FormControl('', [Validators.required]),
    dateN: new FormControl('', [Validators.required]),
    lieu: new FormControl('', [Validators.required]),
    classe: new FormControl('', [Validators.required]),
    telP: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(9),
    Validators.maxLength(12), validationTelephone]),
    email: new FormControl('', [Validators.email]),
    telephone: new FormControl('', [Validators.maxLength(100), Validators.minLength(9),
      Validators.maxLength(12), validationTelephone]),
  })

  constructor(private eleve: ElevesService) { }

  ngOnInit(): void {
    this.getAllEleves()
  }

  getAllEleves() {
    this.eleve.getAllEleves().subscribe(res => {
      this.eleves = res
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

  submit() {
    this.submitErr = true

    if (this.formGroup.valid) {
      this.submitErr = false
      const prenom = this.formGroup.get('prenom')?.value
      const nom = this.formGroup.get('nom')?.value
      const sexe = this.formGroup.get('sexe')?.value
      const email = this.formGroup.get('email')?.value
      const telephone = this.formGroup.get('telephone')?.value
      const parent = this.formGroup.get('telP')?.value
      const dateNaissance = this.formGroup.get('dateN')?.value
      const lieuNaissance = this.formGroup.get('lieu')?.value
      const classe = this.formGroup.get('classe')?.value

      const service = {
        nom: nom,
        prenom: prenom,
        dateNaissance: dateNaissance,
        lieuNaissance: lieuNaissance,
        sexe: sexe,
        telephone: telephone,
        email: email,
        parent: parent,
        classe:classe
      }

      if (!this.isModify) {
        this.eleve.addEleve(service)
          .subscribe(
            (res: any) => {
              console.log(res)
              this.isModify = false;
              this.formGroup.reset();
              $("#exampleModal").modal("hide");
              this.getAllEleves()
            }
          )
      } else {
        console.log('modification')
      }
    }


  }
  nameValue(name:any){
    this.recherche = name
    console.log(this.recherche)
  }
  modifier(d: any) {
    var result = confirm("Voulez-vous modifier : " + d.nom + " ?");
    if (result) {
      this.isModify = true;
      this.eleveId = d.id
      this.formGroup.patchValue({
        prenom: d.prenom,
        nom: d.nom,
        sexe: d.sexe,
        dateN: d.dateNaissance,
        lieu:d.lieuNaissance,
        // email: d.email,
        // telephone: d.telephone,
      });
      $("#exampleModal").modal("show");
    }
  }
}
