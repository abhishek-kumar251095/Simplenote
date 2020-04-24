import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotesModel } from '../models/notes.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public newNoteEmitter: Subject<NotesModel> = new Subject<NotesModel>();
  public noteEditEmitter: Subject<boolean> = new Subject<boolean>();

  private baseUrl = 'http://localhost:3000/';

  private tempToken = 'JWT auth-token'; // To be implmented

  constructor(public httpClient: HttpClient) { }

  getNotes(): Observable<NotesModel[] | any> {

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.tempToken))}`
    })

    return this.httpClient.get(this.baseUrl+'notes', {headers: reqHeaders});
    
  }

  postNotes(note: NotesModel): Observable<Object> {

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.tempToken))}`
    })

    return this.httpClient.post(this.baseUrl+'notes', note, {headers: reqHeaders});

  }

  getNoteById(id: string): Observable<NotesModel | any> {

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.tempToken))}`
    })

    return this.httpClient.get(this.baseUrl+`notes/${id}`, {headers: reqHeaders});

  }
}
