import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  getItem(key: LocalStorageKey): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: LocalStorageKey, data: string): void {
    return localStorage.setItem(key, data);
  }

  deleteItem(key: LocalStorageKey): void {
    return localStorage.removeItem(key);
  }
}
