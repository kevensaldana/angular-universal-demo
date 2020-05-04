import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {CharacterActions} from '@shared/characters/domain/character-actions';
import { CharacterStore } from './character-store';
import {ApiCharacters} from '@shared/characters/domain/api-characters';

@Injectable({ providedIn: 'root' })
export class CharacterRepository {
  constructor(private apiCharacters: ApiCharacters, private store: Store) {

  }

  load() {
    return this.apiCharacters.fetch().pipe(tap((data) => {
      this.store.dispatch(new CharacterActions.Fetch(data));
    }));
  }

  list() {
    return this.store.select(CharacterStore.characters);
  }
}
