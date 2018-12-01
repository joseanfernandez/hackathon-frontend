import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from '../intefaces/user';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  public getTopUsers(): Observable<User[]> {
    const url = environment.firebase.databaseURL;
    return this.http.get<User[]>(url);
  }
}
