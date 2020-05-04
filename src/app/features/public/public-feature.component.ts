import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '@shared/ui/base.component';
import { CharactersFacade } from '@shared/characters/application/characters-facade';

@Component({
  templateUrl: './public-feature.component.html'
})
export class PublicFeatureComponent extends BaseComponent implements OnInit {
  constructor(private charactersFacade: CharactersFacade) {
    super();
  }
  ngOnInit(): void {
    this.charactersFacade.load().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
