import { Injectable } from '@angular/core';
import { SessionStorageKey } from '../local-storage';

@Injectable({
  providedIn: 'root',
})
export class SesionStorageService {
  getItem = (key: SessionStorageKey): string | null =>
    sessionStorage.getItem(key);

  setItem = (key: SessionStorageKey, data: string): void =>
    sessionStorage.setItem(key, data);

  deleteItem = (key: SessionStorageKey): void => sessionStorage.removeItem(key);

  clear = () => sessionStorage.clear();

  size = () => sessionStorage.length;
}
