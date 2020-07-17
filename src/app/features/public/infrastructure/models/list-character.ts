import {Character} from '@features/public/infrastructure/models/character';


export class ListCharacter {
  limit: number;
  total: number;
  count: number;
  result: Character[];

  constructor(limit = 0, total = 0, count = 0, result: Character[]  = []) {
    this.limit = limit;
    this.total = total;
    this.count = count;
    this.result = result;
  }

}
