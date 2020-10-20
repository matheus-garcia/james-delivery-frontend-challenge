import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { Data } from '../enums/data.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService {
  data: IDBPDatabase;
  constructor() {}

  async startDatabase(): Promise<void> {
    console.log('starting');
    this.data = await openDB('pwa-establishments', 1, {
      upgrade(db) {
        db.createObjectStore(Data.STORE_NAME, { keyPath: 'id' });
      },
    });
  }
}
