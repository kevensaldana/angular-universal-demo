import {Action, Selector, State, StateContext} from '@ngxs/store';
import { CharacterActions } from './character-actions';
import {Injectable} from '@angular/core';
import {ListCharacter} from '@features/public/presentation/models/list-character';
import {CharactersFacade} from '../../application/characters-facade';
import {tap} from 'rxjs/operators';


@State<ListCharacter>({
  name: 'character',
  defaults: new ListCharacter(0, 0, 0, [])
})
@Injectable()
export class CharacterStore {

  constructor(private charactersFacade: CharactersFacade) {
  }

  @Selector()
  static characters(state: ListCharacter) {
    return state.result;
  }

  @Action(CharacterActions.Fetch)
  fetch(ctx: StateContext<ListCharacter>) {
    return this.charactersFacade.load().pipe(tap((listCharacter) => {
      ctx.setState({
        limit: listCharacter.limit,
        total: listCharacter.total,
        count: listCharacter.count,
        result: listCharacter.result
      });
    }));

  }
}
