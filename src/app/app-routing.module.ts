import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesDetailsComponent } from './notes-list/notes-details/notes-details.component';


const routes: Routes = [
  {path:'', component: NotesListComponent, children: [
    {path:'notes/:id', component: NotesDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
