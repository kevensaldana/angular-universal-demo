import {Component} from '@angular/core';
import {AnalyticsService} from '@shared/common-infrastructure/analytics.service';

@Component({
  templateUrl: './home-view.component.html'
})
export class HomeViewComponent {
  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.setVirtualPageView('Home');
  }
}
