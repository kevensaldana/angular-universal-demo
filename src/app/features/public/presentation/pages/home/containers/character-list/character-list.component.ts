import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '@shared/presentation/ui/base/base.component';
import {Select, Store} from '@ngxs/store';
import {CharacterStore} from '@features/public/presentation/state/character-store';
import {Observable} from 'rxjs';
import {Character} from '@features/public/presentation/models/character';
import { CharacterActions } from '@features/public/presentation/state/character-actions';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html'
})
export class CharacterListComponent extends BaseComponent implements OnInit {
  @Select(CharacterStore.characters) $listCharacters: Observable<Character[]>;
  constructor(private store: Store) {
    super();
  }
  ngOnInit() {
    this.store.dispatch(new CharacterActions.Fetch());
  }
}
