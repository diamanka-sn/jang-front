import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepensesService } from 'src/app/services/depenses.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit {
  tailles = [5, 10, 25, 100]
  taille = 10;
  page: number = 1
  totalLength!: number
  recherche!: any
  depenses: any
  i: number = 0;
  depenseId!: number
  categories!: any[];
  codeGeographique!: any[]
  medicaments: any[] = [];
  formes!: any[]
  meds: any[] = [];
  isModify: boolean = false;
  dateLime: any = Date.now()
  modification: boolean = false
  errorLib!: boolean
  modif: any

  errorModif!: boolean

  formGroup = new FormGroup({

    montant: new FormControl('', [Validators.required]),
    libelle: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  })

  constructor(private dp: DepensesService) { }

  ngOnInit(): void {
    this.getAllDepenses()
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

  getAllDepenses() {
    this.dp.getAllDepense().subscribe(res => {
      this.depenses = res
    })
  }

  submit() {
    const libelle = this.formGroup.get('libelle')?.value
    const montant = this.formGroup.get('montant')?.value

    const depense = {
      libelle: libelle,
      montant: montant
    }

    if (!this.isModify) {
      this.dp.addDepense(depense)
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
            this.getAllDepenses()
          }
        )
    } else {
      this.dp.modifyOneDepense(this.depenseId, depense).then((res) => {
        this.modif = res
        if (!this.modif.erreur) {
          this.errorModif = false
          this.getAllDepenses();

          $("#exampleModal").modal("hide");
          this.depenseId = 0
          this.formGroup.reset()
          this.isModify = false
        } else {
          this.errorModif = true
        }

      })
    }
  }
  afficherButtonSave() {
    this.formGroup.reset();
    this.isModify = false;
    $('#exampleModal').modal('show');
  }
  modifier(d: any) {
    var result = confirm("Voulez-vous modifier : " + d.libelle + "?");
    if (result) {
      this.isModify = true;
      this.depenseId = d.id
      this.formGroup.patchValue({
        montant: d.montant,
        libelle: d.libelle,
      });
      $("#exampleModal").modal("show");
    }

  }
  supprimer(d: number) {
    var result = confirm("Voulez-vous supprimer ?");
    if (result) {
      this.dp.deleteOneDepense(d)
        .then(
          (res) => {
            this.getAllDepenses();
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )
    }

  }
}
