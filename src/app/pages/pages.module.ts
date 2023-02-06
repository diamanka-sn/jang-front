import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { ServiceComponent } from './service/service.component';
import { PagesComponent } from './pages.component';
import { SidebarComponent } from '../composants/sidebar/sidebar.component';
import { HeaderComponent } from '../composants/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DepensesComponent } from './depenses/depenses.component';
import { ComptabilitesComponent } from './comptabilites/comptabilites.component';
import { ElevesComponent } from './eleves/eleves.component';
import { DatePipe } from '@angular/common';
import { InventaireComponent } from './inventaire/inventaire.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ParentEleveComponent } from './parent-eleve/parent-eleve.component';
import { DetailComponent } from './parent-eleve/detail/detail.component';
import { CompteComponent } from './compte/compte.component';
import { DetailEleveComponent } from './eleves/detail-eleve/detail-eleve.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AccueilComponent,
    PagesComponent,
    SidebarComponent,
    HeaderComponent,
    ServiceComponent,
    DepensesComponent,
    ComptabilitesComponent,
    ElevesComponent,
    InventaireComponent,
    ParentEleveComponent,
    DetailComponent,
    CompteComponent,
    DetailEleveComponent, 
    DashboardComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    DatePipe
  ],
})
export class PagesModule { }
