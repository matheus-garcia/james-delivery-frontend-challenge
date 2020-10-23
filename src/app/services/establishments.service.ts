import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDBPDatabase } from 'idb';
import { BehaviorSubject } from 'rxjs';
import { Establishment, EstablishmentDb } from '@interfaces/establishment';
import { Data } from '@enums/data.enum';
import { environment } from '../../environments/environment';
import { LocalDbService } from './local-db.service';

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
      if (!dbValues.length) {
        this.getEstablishmentsFromApi();
        this.bsEstablishments.subscribe((establishments) => {
          this.createNewEstablishments(establishments);
        });
      } else {
        this.handleNewerEstablishments(dbValues);
      }
    });
  }

  private handleNewerEstablishments(dbValues: Establishment[]): void {
    this.http.get<Establishment[]>(`${this.apiUrl}/establishments`).subscribe(
      (res) => {
        this.mergeData(dbValues, res.sort(this.orderById));
      },
      () => {
        this.http.get<EstablishmentDb>(`${this.apiUrl}/db`).subscribe((res) => {
          this.mergeData(dbValues, res.establishments.sort(this.orderById));
        });
      }
    );
  }

  private comparer(otherArray) {
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other.id === current.id;
        }).length == 0
      );
    };
  }

  private mergeData(
    dbValues: Establishment[],
    newerEstablishments: Establishment[]
  ) {
    var newDataFromApi = newerEstablishments.filter(this.comparer(dbValues));

    const result = dbValues.concat(newDataFromApi);
    this.establishments = result;
    this.bsEstablishments.next(this.establishments);
    this.bsEstablishments.subscribe((establishments) => {
      this.updateEstablishments(establishments);
    });
  }

  private createNewEstablishments(establishments: Establishment[]): void {
    let transaction = this.db.transaction(Data.STORE_NAME, 'readwrite');
    establishments.forEach((establishment) => {
      transaction.store.add(establishment);
    });
  }

  private updateEstablishments(establishments: Establishment[]): void {
    let transaction = this.db.transaction(Data.STORE_NAME, 'readwrite');
    establishments.forEach((establishment) => {
      transaction.store.put(establishment);
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

  orderById(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  private getEstablishmentsFromApi(): void {
    this.http.get<Establishment[]>(`${this.apiUrl}/establishments`).subscribe(
      (res) => {
        this.bsEstablishments.next(res);
        this.establishments = res;

        this.establishments.sort(this.orderById);
      },
      () => {
        this.http.get<EstablishmentDb>(`${this.apiUrl}/db`).subscribe((res) => {
          this.bsEstablishments.next(res.establishments);
          this.establishments = res.establishments;
        });
      }
    );
  }

  async saveEstablishment(values: Establishment) {
    let transaction = this.db.transaction(Data.STORE_NAME, 'readwrite');
    return transaction.store.put(values);
  }

  async getEstablishmentById(id): Promise<Establishment> {
    let transaction = this.db.transaction(Data.STORE_NAME, 'readonly');
    return transaction.store.get(id);
  }
}
