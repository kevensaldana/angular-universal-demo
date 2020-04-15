import {Component, OnInit} from '@angular/core';
import {SeoFacade} from '@shared/application/seo-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private seoFacade: SeoFacade) {}

  ngOnInit() {
    this.seoFacade.addTags();
  }

}
