interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
}

export class ResponseCharacter {
  limit: number;
  total: number;
  count: number;
  result: Character[];
  constructor(limit = 0, total = 0, count = 0, result = []) {
    this.limit = limit;
    this.total = total;
    this.count = count;
    this.result = result;
  }
}
