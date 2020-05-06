import {Component, OnInit} from '@angular/core';
import {FacadePwaService} from '@shared/service-worker/application/facade-pwa.service';
import {SeoFacade} from '@shared/seo/application/seo-facade';
import { FacadeTrackError } from '@shared/tracking-errors/application/facade-track-error';

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
