import {Action, Selector, State, StateContext} from '@ngxs/store';
import { CharacterActions } from './character-actions';

interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CharacterStoreInterface {
  limit: number;
  total: number;
  count: number;
  result: Character[];
}
@State<CharacterStoreInterface>({
  name: 'character',
  defaults: {
    limit: 0,
    total: 0,
    count: 0,
    result: []
  }
})
export class CharacterStore {

  @Selector()
  static characters(state: CharacterStoreInterface) {
    return { ... state};
  }

  @Action(CharacterActions.Fetch)
  fetch(ctx: StateContext<CharacterStoreInterface>, action: CharacterActions.Fetch) {
    ctx.setState({
      limit: action.payload.limit,
      total: action.payload.total,
      count: action.payload.count,
      result: action.payload.result
    });
  }
}
