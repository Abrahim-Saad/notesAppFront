import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseURL = "https://routeegypt.herokuapp.com/"

  constructor(public _HttpClient: HttpClient) { }


  getAllNotesApiService(userIdAndToken): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'getUserNotes', userIdAndToken)
  }

  addNoteApiService(noteData): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'addNote', noteData)
  }

  updateNoteApiService(tokenAndNoteData): Observable<any> {
    return this._HttpClient.put(this.baseURL + 'updateNote', tokenAndNoteData)
  }


  deleteNoteApiService(userTokenAndNoteID): Observable<any> {
    let noteData = {
      headers: new HttpHeaders({}),
      body: { NoteID: userTokenAndNoteID.NoteID, token: userTokenAndNoteID.token }
    }
    return this._HttpClient.delete(this.baseURL + 'deleteNote', noteData)
  }
}
