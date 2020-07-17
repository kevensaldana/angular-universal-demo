import {Injectable} from '@angular/core';
import {CharacterRepository} from '@features/public/infrastructure/repositories/character-repository';

@Injectable()
export class CharactersFacade {
    constructor(private characterRepository: CharacterRepository) {

    }
    load() {
      return this.characterRepository.load();
    }
}
