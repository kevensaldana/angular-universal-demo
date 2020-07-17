import {Character} from '@features/public/presentation/models/character';

export class ListCharacter {
  limit: number;
  total: number;
  count: number;
  result: Character[];

  constructor(limit: number, total: number , count: number, result: Character[]) {
    this.limit = limit;
    this.total = total;
    this.count = count;
    this.result = result;
  }

}
