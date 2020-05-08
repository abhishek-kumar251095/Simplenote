import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotesModel } from '../models/notes.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RecentlyDeletedModel } from '../models/recently.deleted.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public newNoteEmitter: Subject<NotesModel> = new Subject<NotesModel>();
  public noteEditEmitter: Subject<boolean> = new Subject<boolean>();
  public noteDeleteEmitter: Subject<string> = new Subject<string>();

  private baseUrl = 'http://localhost:3000/';

  constructor(public httpClient: HttpClient, public authService: AuthService) { }

  getNotes(): Observable<NotesModel[] | any> {

    let token = this.authService.getToken()

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(token))}`
    })

    return this.httpClient.get(this.baseUrl+'notes', {headers: reqHeaders});
    
  }

  postNotes(note: NotesModel): Observable<Object> {

    let token = this.authService.getToken()

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(token))}`
    })

    return this.httpClient.post(this.baseUrl+'notes', note, {headers: reqHeaders});

  }

  getNoteById(id: string): Observable<NotesModel | any> {

    let token = this.authService.getToken()

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(token))}`
    })

    return this.httpClient.get(this.baseUrl+`notes/${id}`, {headers: reqHeaders});

  }

  softDeleteNote(id: string): Observable<NotesModel | any> {

    let token = this.authService.getToken()

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(token))}`
    });

    return this.httpClient.delete(this.baseUrl+`notes/${id}`, {headers: reqHeaders});

  }

  undoDeleteNote(recentlyDeletedData: RecentlyDeletedModel) {

    let token = this.authService.getToken();

    const reqHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(JSON.stringify(token))}`
    });

    return this.httpClient.put(this.baseUrl+`notes?recentlyDeleted=${recentlyDeletedData.id}`, {}, {headers: reqHeaders});
  }
}
