import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NotesModel } from '../models/notes.model';
import { Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { map, filter, flatMap } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {

  faPlus = faPlus;
  faSearch = faSearch;
  notes: NotesModel[] = [];
  filteredNotes: NotesModel[] = [];
  searchMode: boolean = false;
  titleChangeSubscription: Subscription;

  constructor(public router: Router, public notesService: NotesService) { }

  ngOnInit(): void {

    this.getAllNotes()
        .subscribe(res => {
          this.notes = res;
        });
    
    this.titleChangeSubscription = this.notesService
                                       .noteEditEmitter
                                       .pipe( 
                                          flatMap(res => {
                                            return this.getAllNotes()
                                          })
                                       )
                                       .subscribe(res => {
                                         this.notes = res;
                                       })
    
  }

  getAllNotes() {

    return this.notesService
               .getNotes()
               .pipe(
                  filter(res => res.title !== '')
                )

  }

  onSearch(event) {

    if (event.target.value === '') {

      this.searchMode = false;
      this.filteredNotes = [];

      return;
    }

    this.searchMode = true;
    this.filteredNotes = this.notes.slice().filter(note => {
      return note.title.includes(event.target.value) || note.content.includes(event.target.value);
    })

  }

  renderNotes() {

    if (this.searchMode) {
      return this.filteredNotes;
    } 

    return this.notes;
  }


  isActive(url:any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(url), false);
  }

  onNewNote() {
    let newNote = new NotesModel("New Note", "", 0, new Date(), "O738iwuhwoDisau0");
    this.notesService
        .postNotes(newNote)
        .pipe(
          flatMap((res) => {
            return this.getAllNotes();
          })
        )
        .subscribe((res: NotesModel[]) => {
            this.notes = res;
            this.notesService.newNoteEmitter.next(res[res.length-1]);
        });
  }


  ngOnDestroy(): void {

    this.titleChangeSubscription.unsubscribe();

  }
}
