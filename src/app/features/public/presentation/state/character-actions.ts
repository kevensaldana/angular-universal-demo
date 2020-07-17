
// tslint:disable-next-line:no-namespace
export namespace CharacterActions {
  export const enum Types {
    FETCH = '[@character] Fetch'
  }
  export class Fetch {
    static readonly type = Types.FETCH;
  }
}
