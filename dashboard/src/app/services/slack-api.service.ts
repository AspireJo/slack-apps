import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { NomieesData } from '../models/NomieesData';

@Injectable()
export class SlackApiService {

  constructor(private http: HttpClient) { }

  /* Check Client Passcode */
  getNomieesData(): Observable<NomieesData> {
    const url = environment.nomineesApiUrl.replace(':teamId', environment.teamId);
    return this.http.get<NomieesData>(url);
  }
}
