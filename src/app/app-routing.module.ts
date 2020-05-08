import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesDetailsComponent } from './notes-list/notes-details/notes-details.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path:'', component: NotesListComponent, children: [
    {path:'notes/:id', component: NotesDetailsComponent, canActivate: [AuthGuardService]}
  ], canActivate: [AuthGuardService]},
  {path:'auth/register', component: RegisterComponent},
  {path:'auth/login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
