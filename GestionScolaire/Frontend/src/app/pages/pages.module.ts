import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { TodoListComponent } from "../apps/todo-list/todo-list.component";
import { TodoComponent } from "../apps/todo-list/todo/todo.component";
import { ContentAnimateDirective } from "../shared/directives/content-animate.directive";
import { FooterComponent } from "../shared/footer/footer.component";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { EditProfilComponent } from "../user-pages/edit-profil/edit-profil.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EnseignantComponent } from "./enseignant/enseignant.component";
import { AddEleveComponent } from "./gestion-eleve/add-eleve/add-eleve.component";
import { EditEleveComponent } from "./gestion-eleve/edit-eleve/edit-eleve.component";
import { GestionEleveComponent } from "./gestion-eleve/gestion-eleve.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { EtablissementComponent } from './etablissement/etablissement.component';
import { AddEtablissementComponent } from './etablissement/add-etablissement/add-etablissement.component';
import { AddEnseignantComponent } from './enseignant/add-enseignant/add-enseignant.component';
import { EditEnseignantComponent } from './enseignant/edit-enseignant/edit-enseignant.component';
import { DownloadComponent } from './gestion-eleve/download/download.component';
import { EditEtablissementComponent } from './etablissement/edit-etablissement/edit-etablissement.component';
import { PeriodeComponent } from './periode/periode.component';
import { AddPeriodeComponent } from './periode/add-periode/add-periode.component';
import { EditPeriodeComponent } from './periode/edit-periode/edit-periode.component';
import { ClasseComponent } from './classe/classe.component';
import { AddClasseComponent } from './classe/add-classe/add-classe.component';
import { EditClasseComponent } from './classe/edit-classe/edit-classe.component';
import { AnneeScolaireComponent } from './annee-scolaire/annee-scolaire.component';
import { AddAnneeScolaireComponent } from './annee-scolaire/add-annee-scolaire/add-annee-scolaire.component';
import { EditAnneeScolaireComponent } from './annee-scolaire/edit-annee-scolaire/edit-annee-scolaire.component';
import { DetailComponent } from './gestion-eleve/detail/detail.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { AddPersonnelComponent } from './personnel/add-personnel/add-personnel.component';
import { EditPersonnelComponent } from './personnel/edit-personnel/edit-personnel.component';
import { UsersComponent } from './users/users.component';
import { MensualiteComponent } from './mensualite/mensualite.component';
import { AddMensualiteComponent } from './mensualite/add-mensualite/add-mensualite.component';
import { EditMensualiteComponent } from './mensualite/edit-mensualite/edit-mensualite.component';
import { DepenseComponent } from './depense/depense.component';
import { AddDepenseComponent } from './depense/add-depense/add-depense.component';
import { EditDepenseComponent } from './depense/edit-depense/edit-depense.component';
import { PayementSalaireComponent } from './payement-salaire/payement-salaire.component';
import { AddPayementSalaireComponent } from './payement-salaire/add-payement-salaire/add-payement-salaire.component';
import { EditPayementSalaireComponent } from './payement-salaire/edit-payement-salaire/edit-payement-salaire.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailEnsComponent } from './enseignant/detail-ens/detail-ens.component';
import { DetailPerComponent } from './personnel/detail-per/detail-per.component';
import { DetailDepComponent } from './depense/detail-dep/detail-dep.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule
  ],
  declarations: [
    PagesComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    GestionEleveComponent,
    EnseignantComponent,
    AddEleveComponent,
    EditEleveComponent,
    EditProfilComponent,
    EtablissementComponent,
    AddEtablissementComponent,
    AddEnseignantComponent,
    EditEnseignantComponent,
    DownloadComponent,
    EditEtablissementComponent,
    PeriodeComponent,
    AddPeriodeComponent,
    EditPeriodeComponent,
    ClasseComponent,
    AddClasseComponent,
    EditClasseComponent,
    AnneeScolaireComponent,
    AddAnneeScolaireComponent,
    EditAnneeScolaireComponent,
    DetailComponent,
    PersonnelComponent,
    AddPersonnelComponent,
    EditPersonnelComponent,
    UsersComponent,
    MensualiteComponent,
    AddMensualiteComponent,
    EditMensualiteComponent,
    DepenseComponent,
    AddDepenseComponent,
    EditDepenseComponent,
    PayementSalaireComponent,
    AddPayementSalaireComponent,
    EditPayementSalaireComponent,
    AddUserComponent,
    EditUserComponent,
    DetailEnsComponent,
    DetailPerComponent,
    DetailDepComponent,
    DetailUserComponent
  ],
  providers: [],
})
export class PagesModule {
}
