import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '@shared/infrastructure/ui/base.component';
import {CharactersFacade} from '@shared/application/characters-facade';

@Component({
  selector: 'app-character-list',
  styleUrls: ['./character-list.component.scss'],
  templateUrl: './character-list.component.html'
})
export class CharacterListComponent extends BaseComponent implements OnInit {
  $listCharacters = this.charactersFacade.list();
  constructor(private charactersFacade: CharactersFacade) {
    super();
  }
  ngOnInit() {
  }
}
