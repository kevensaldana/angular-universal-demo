import {Component, OnInit} from '@angular/core';
import {CharactersFacade} from '../../shared/application/characters-facade';

@Component({
  templateUrl: './public-feature.component.html'
})
export class PublicFeatureComponent implements OnInit {
  constructor(private charactersFacade: CharactersFacade) {

  }
  ngOnInit(): void {
    this.charactersFacade.request();
  }
}
