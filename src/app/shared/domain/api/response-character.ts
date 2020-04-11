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
}
