import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ComptabilitesComponent } from './pages/comptabilites/comptabilites.component';
import { CompteComponent } from './pages/compte/compte.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepensesComponent } from './pages/depenses/depenses.component';
import { DetailEleveComponent } from './pages/eleves/detail-eleve/detail-eleve.component';
import { ElevesComponent } from './pages/eleves/eleves.component';
import { InventaireComponent } from './pages/inventaire/inventaire.component';
import { PagesComponent } from './pages/pages.component';
import { DetailComponent } from './pages/parent-eleve/detail/detail.component';
import { ParentEleveComponent } from './pages/parent-eleve/parent-eleve.component';
import { ServiceComponent } from './pages/service/service.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'espace', component: PagesComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'depense', component: DepensesComponent },
      { path: 'comptabilite', component: ComptabilitesComponent },
      { path: 'eleve', component: ElevesComponent },
      { path: 'inventaire', component: InventaireComponent },
      { path: 'parent', component: ParentEleveComponent },
      { path: 'parent/:id', component: DetailComponent },
      { path: 'eleve/:id', component: DetailEleveComponent },
      { path: 'compte', component: CompteComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
