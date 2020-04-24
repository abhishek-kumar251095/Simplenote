import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './services/notes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotesModel } from './models/notes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'simplenote';
  newNoteSubscription: Subscription;

  constructor(public notesService: NotesService, public router: Router){}

  ngOnInit(): void {

    this.newNoteSubscription = this.notesService.newNoteEmitter.subscribe((res: NotesModel) => {
      this.router.navigate(['notes', res._id]);
    });

  }

  ngOnDestroy(): void {
    this.newNoteSubscription.unsubscribe();
  }
}
