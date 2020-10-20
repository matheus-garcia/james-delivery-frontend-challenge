import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Establishment, EstablishmentDb } from '../interfaces/establishment';
import { IDBPDatabase } from 'idb';
import { BehaviorSubject } from 'rxjs';
import { LocalDbService } from './local-db.service';
import { Data } from '../enums/data.enum';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  apiUrl: string = environment.API_ENDPOINT;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private db: IDBPDatabase;
  private establishments: Establishment[] = [];

  bsEstablishments: BehaviorSubject<Establishment[]> = new BehaviorSubject(
    this.establishments
  );

  constructor(private http: HttpClient, private localDatabase: LocalDbService) {
    this.db = this.localDatabase.data;
    this.getAllValuesLocally().then((dbValues) => {
      console.log("entrou 1", !dbValues.length)
      if (!dbValues.length) {
        console.log("entrou")
        /* Should Update local database. Should check if values from server 
         differ from what we have locally? */
        this.getEstablishmentsFromApi();
        console.log('bsEstablishments', this.bsEstablishments);
        this.bsEstablishments.subscribe((establishments) => {
          this.newEstablishments(establishments);
        });
      } else {
        // Database has data, maybe I should check if Ids from server are
        // the ones locally, if they are not, check the new Id and push to the
        // array?
        this.establishments = dbValues;
        this.bsEstablishments.next(this.establishments);
      }
    });
  }

  private newEstablishments(establishments: Establishment[]): void {
    establishments.forEach((establishment) => {
      let transaction = this.db.transaction(Data.STORE_NAME, 'readwrite');
      transaction.store.add(establishment);
      transaction.done
        .then(() => console.log('success'))
        .catch(() => console.log('failed trying to insert duplicated key'));
    });
  }

  private async getAllValuesLocally(): Promise<Establishment[]> {
    return await this.db.getAll(Data.STORE_NAME);
  }

  updateEstablishmentsList(): void {
    this.getAllValuesLocally().then((dbValues) => {
      this.bsEstablishments.next(dbValues);
    });
  }

  private getEstablishmentsFromApi(): void {
    /*Since there are two endpoints with same data, try to get data 
    from both endpoints.I'm just assuming that is the reason there 
    two endpoints with same data */
    console.log('aqui');
    try {
      this.http
        .get<Establishment[]>(`${this.apiUrl}/establishments`)
        .subscribe((res) => {
          this.bsEstablishments.next(res);
          this.establishments = res;
        });
    } catch (err) {
      console.log('Trying to get data from sec api');
      this.http.get<EstablishmentDb>(`${this.apiUrl}/db`).subscribe((res) => {
        this.bsEstablishments.next(res.establishments);
        this.establishments = res.establishments;
      });
    }
  }

  async getEstablishmentById(id): Promise<Establishment> {
    let transaction = this.db.transaction(Data.STORE_NAME, 'readonly');
    return transaction.store.get(id);
  }
}
