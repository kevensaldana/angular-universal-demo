import {Character as CharacterEntity} from '../../domain/entities/character';

export class Character extends CharacterEntity {
  constructor(id: number, name: string, description: string, image: string) {
    super(id, name, description, image);
  }
}
