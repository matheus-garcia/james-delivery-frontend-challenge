import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Establishment } from '../interfaces/establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  apiUrl: string = environment.API_ENDPOINT;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Read
  getAll() {
    return this.http.get<Establishment[]>(`${this.apiUrl}/establishments`);
  }
}
