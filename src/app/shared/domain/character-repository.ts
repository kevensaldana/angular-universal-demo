import {Injectable} from '@angular/core';
import {ApiCharacters} from './api/api-characters';
import {Store} from '@ngxs/store';
import {CharacterStore, CharacterStoreInterface} from '@shared/domain/character-store';
import {tap} from 'rxjs/operators';
import {CharacterActions} from '@shared/domain/character-actions';

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
