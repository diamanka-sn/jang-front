import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElevesService } from 'src/app/services/eleves.service';
import { validationTelephone } from 'src/model/config';

@Component({
  selector: 'app-parent-eleve',
  templateUrl: './parent-eleve.component.html',
  styleUrls: ['./parent-eleve.component.scss']
})
export class ParentEleveComponent implements OnInit {
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

  parents: any
  parentId!: number
  erreurTelephone: boolean = false
  erreurEmail: boolean = false
  submitErr: boolean = false

  modif: any

  formGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    prenom: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    sexe: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(9),
    Validators.maxLength(12), validationTelephone]),
    email: new FormControl('', [Validators.required, Validators.email]),

  })

  constructor(private pt: ElevesService) { }

  ngOnInit(): void {
    this.getAllParent()
  }
  getAllParent() {
    this.pt.getAllParent().subscribe(res => {
      // console.log(res)
      this.parents = res
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
  afficherButtonSave() {
    this.formGroup.reset();
    this.isModify = false;
    $('#exampleModal').modal('show');
    document.getElementById('prenom')?.focus
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

      const service = {
        prenom: prenom,
        nom: nom,
        sexe: sexe,
        email: email,
        telephone: telephone
      }
      if (!this.isModify) {
        this.pt.addParent(service)
          .subscribe(
            (res: any) => {
              if (res.err) {
                if (res.errorTelephone) {
                  this.erreurTelephone = true
                }
                else {
                  this.erreurTelephone = false
                }
                if (res.errorEmail) {
                  this.erreurEmail = true
                }
                else {
                  this.erreurEmail = false
                }
                return
              }
              this.isModify = false;
              this.formGroup.reset();
              $("#exampleModal").modal("hide");
              this.getAllParent()
            }
          )
      } else {
        this.pt.modifierParent(this.parentId, service).then((res) => {
          this.modif = res
          if (!this.modif.erreur) {
            this.errorModif = false
            this.getAllParent();
            $("#exampleModal").modal("hide");
            this.parentId = 0
            this.formGroup.reset()
            this.isModify = false
          } else {
            console.log('inatendu')
            this.errorModif = true
          }
        })
      }
    }


  }

  supprimer(d: number) {
    var result = confirm("Voulez-vous supprimer ?");
    if (result) {
      this.pt.supprimerParent(d)
        .then(
          () => {
            this.getAllParent();
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )
    }
  }

  modifier(d: any) {
    var result = confirm("Voulez-vous modifier : " + d.nom + " ?");
    if (result) {
      this.isModify = true;
      this.parentId = d.id
      this.formGroup.patchValue({
        prenom: d.prenom,
        nom: d.nom,
        sexe: d.sexe,
        email: d.email,
        telephone: d.telephone,
      });
      $("#exampleModal").modal("show");
    }
  }
}
