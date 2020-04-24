import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotesModel } from 'src/app/models/notes.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() note: NotesModel;

  constructor(public router: Router) { }

  ngOnInit(): void {}

  onGetNoteDetails(id) {
    this.router.navigate(['notes', id]);
  }

  isActive(url: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(url), false);
  }
}
