import {Component} from '@angular/core';
import {AnalyticsService} from '@shared/infrastructure/analytics/analytics.service';

@Component({
  templateUrl: './home-view.component.html'
})
export class HomeViewComponent {
  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.setVirtualPageView('Home');
  }
}
