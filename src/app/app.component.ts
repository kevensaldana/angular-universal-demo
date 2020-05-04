import {Component, OnInit} from '@angular/core';
import {FacadePwaService} from '@shared/service-worker/application/facade-pwa.service';
import {SeoFacade} from '@shared/seo/application/seo-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private seoFacade: SeoFacade, private facadePwaService: FacadePwaService) {
  }

  ngOnInit() {
    this.facadePwaService.initTasks();
    this.seoFacade.addTags();
  }
}
