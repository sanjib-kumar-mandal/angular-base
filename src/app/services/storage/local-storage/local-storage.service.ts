import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem = (key: LocalStorageKey): string | null => localStorage.getItem(key);

  setItem = (key: LocalStorageKey, data: string): void => localStorage.setItem(key, data);

  deleteItem = (key: LocalStorageKey): void => localStorage.removeItem(key);

  clear = () => localStorage.clear();

  size = () => localStorage.length;
}
