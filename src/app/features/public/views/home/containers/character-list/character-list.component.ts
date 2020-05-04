import {Component, OnInit} from '@angular/core';
import { BaseComponent } from '@shared/ui/base.component';
import {CharactersFacade} from '@shared/characters/application/characters-facade';

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
