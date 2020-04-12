import {CharacterRepository} from '../domain/character-repository';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CharactersFacade {
    constructor(private characterRepository: CharacterRepository) {

    }
    load() {
      return this.characterRepository.load();
    }
    list() {
      return this.characterRepository.list();
    }
}
