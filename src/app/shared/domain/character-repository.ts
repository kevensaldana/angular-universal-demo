import {Injectable} from '@angular/core';
import {ApiCharacters} from './api/api-characters';

@Injectable({ providedIn: 'root' })
export class CharacterRepository {
  constructor(private apiCharacters: ApiCharacters) {

  }
  list() {
      return this.apiCharacters.fetch();
  }
}
