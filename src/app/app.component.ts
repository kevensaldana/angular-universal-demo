import {Component, OnInit} from '@angular/core';
import {SeoFacade} from '@shared/application/seo-facade';
import {FacadePwaService} from '@shared/infrastructure/sw/facade-pwa.service';

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
