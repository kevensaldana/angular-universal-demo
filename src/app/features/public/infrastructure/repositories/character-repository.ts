import {Injectable} from '@angular/core';
import {ApiCharacters} from '@features/public/infrastructure/datasources/api-characters';

@Injectable()
export class CharacterRepository {
  constructor(private apiCharacters: ApiCharacters) {
  }

  load() {
    return this.apiCharacters.fetch();
  }
}
