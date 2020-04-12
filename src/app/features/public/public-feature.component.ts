import {Component, OnInit} from '@angular/core';
import {CharactersFacade} from '@shared/application/characters-facade';
import {BaseComponent} from '@shared/infrastructure/ui/base.component';
import {takeUntil} from 'rxjs/operators';

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
