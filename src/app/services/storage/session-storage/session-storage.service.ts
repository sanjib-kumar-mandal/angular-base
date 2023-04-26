import { Injectable } from '@angular/core';
import { SessionStorageKey } from '../local-storage';

@Injectable({
  providedIn: 'root'
})
export class SesionStorageService {

  constructor() { }

  getItem(key: SessionStorageKey): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: SessionStorageKey, data: string): void {
    return localStorage.setItem(key, data);
  }

  deleteItem(key: SessionStorageKey): void {
    return localStorage.removeItem(key);
  }
}
