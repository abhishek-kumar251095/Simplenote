import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesModel } from 'src/app/models/notes.model';
import { FormGroup, FormControl,  Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { faInfo, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit, AfterContentChecked {

  noteId: string;
  notes: NotesModel[] = [];
  currentNote: NotesModel | any = null;
  notesForm: FormGroup;
  editMode: boolean = true;
  isLoading: boolean = false;
  noteStatus: string = 'saved...';
  saveInterval: any;
  faInfo = faInfo;
  faClock = faClock;
  faTrash = faTrash;
  undoDelete = false;

  constructor(public activateRoute: ActivatedRoute, public notesService: NotesService,
              public router: Router) { }

  ngOnInit(): void {

    this.notesForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required)
    })

    this.activateRoute
        .params
        .pipe(
          flatMap(res => {
            this.noteId = res.id;
            return this.notesService.getNoteById(this.noteId);
          })
        )
        .subscribe(res => {
          this.currentNote = res;
          this.notesForm.patchValue({
            title: this.currentNote.title,
            content: this.currentNote.content
          }); 
        });
  }

  ngAfterContentChecked() {
    const element = document.getElementById('content');
    element.style.height = element.style.height = element.scrollHeight + 'px';
  }

  onSubmit(isNoteEdited: boolean) {
    this.noteStatus = 'saving...';

    const notesBody: NotesModel = {
      _id: this.currentNote._id,
      title: this.notesForm.value.title,
      content: this.notesForm.value.content,
      length: this.notesForm.value.content.length,
      date: this.currentNote.date,
      userId: this.currentNote.userId
    }

    this.notesService
        .postNotes(notesBody)
        .subscribe(res => {

          this.noteStatus = 'saved...';
          this.editMode = true;
          this.currentNote = res;

          if (isNoteEdited) {
            this.notesService.noteEditEmitter.next(isNoteEdited);
          }

        });
  }


  onInputContent(): void {

    this.noteStatus = 'unsaved...';

    if (this.notesForm.value.content !== this.currentNote.content && this.editMode) {
      this.editMode = false;
      setTimeout(() => {

        if (this.notesForm.value.content.slice(0,25) !== this.currentNote.content.slice(0,25)) {
          this.onSubmit(true);
        } else {
          this.onSubmit(false);
        }

      }, 5000);

    }
  }


  onInputTitle(): void {

    this.noteStatus = 'unsaved...'

    if (this.notesForm.value.title !== this.currentNote.title && this.editMode) {

      this.editMode = false;
      setTimeout(() => {
        this.onSubmit(true);
        this.editMode = true;
      }, 7000);

    } else {
      this.editMode = false;
    }
  }


  onDeleteNote(): void {
    this.notesService
        .softDeleteNote(this.currentNote._id)
        .subscribe(res => {
          this.notesService.noteDeleteEmitter.next(res._id);
        });
  }

}
