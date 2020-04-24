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

  private tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllOTRiMTUxZjhhNDQ1MWNhZGM5N2QiLCJ1c2VybmFtZSI6ImZpcnN0Q2l0aXplbiIsImV4cCI6MTU4ODIyODI5OCwiaWF0IjoxNTg3NjIzNDk4fQ.9S_FkYZbvWBrs1D7Ty2syHbBfJA7xYnNBxFhqj6x2v0"

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
