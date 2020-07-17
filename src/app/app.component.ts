import {Component, OnInit} from '@angular/core';
import {SeoFacade} from '@shared/infrastructure/seo/seo-facade';
import { FacadePwaService } from '@shared/infrastructure/pwa/facade-pwa.service';
import { FacadeTrackError } from '@shared/infrastructure/tracking-errors/facade-track-error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private seoFacade: SeoFacade, private facadePwaService: FacadePwaService, private facadeTrackError: FacadeTrackError) {
  }

  ngOnInit() {
    this.facadeTrackError.listenErrors();
    this.facadePwaService.initTasks();
    this.seoFacade.addTags();
  }
}
