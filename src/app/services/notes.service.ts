import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotesModel } from '../models/notes.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RecentlyDeletedModel } from '../models/recently.deleted.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public newNoteEmitter: Subject<NotesModel> = new Subject<NotesModel>();
  public noteEditEmitter: Subject<boolean> = new Subject<boolean>();
  public noteDeleteEmitter: Subject<string> = new Subject<string>();

  private baseUrl = 'http://localhost:3000/';

  private tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTllOTRiMTUxZjhhNDQ1MWNhZGM5N2QiLCJ1c2VybmFtZSI6ImZpcnN0Q2l0aXplbiIsImV4cCI6MTU4OTI3OTMzNywiaWF0IjoxNTg4Njc0NTM3fQ.VFbceSZJMf7HKL4NIZkoOaeb6jYSshflgXbycvkAd7w"

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

  softDeleteNote(id: string): Observable<NotesModel | any> {

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.tempToken))}`
    });

    return this.httpClient.delete(this.baseUrl+`notes/${id}`, {headers: reqHeaders});

  }

  undoDeleteNote(recentlyDeletedData: RecentlyDeletedModel) {
    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(this.tempToken))}`
    });

    return this.httpClient.put(this.baseUrl+`notes?recentlyDeleted=${recentlyDeletedData.id}`, {}, {headers: reqHeaders});
  }
}
