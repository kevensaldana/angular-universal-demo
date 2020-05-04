import {Component, OnInit} from '@angular/core';
import {shareReplay, takeUntil, tap, take} from 'rxjs/operators';
import {BaseComponent} from '@shared/ui/base.component';
import { FacadePwaService } from '@shared/service-worker/application/facade-pwa.service';

@Component({
  templateUrl: './shared-layout.component.html'
})
export class SharedLayoutComponent  extends BaseComponent implements OnInit {
  public readonly applicationInstallable$ = this.facadePwaService.applicationInstallable$;
  public readonly isStandAlone = this.facadePwaService.runningStandAlone;
  public readonly statusPermission$ = this.facadePwaService.statusNotificationsPermissions$;
  public readonly canShowNotifications$ = this.facadePwaService.canShowNotifications$;
  public readonly newVersionAvailable$ = this.facadePwaService.newVersionAvailable$.pipe(
    tap((newVersionAvailable) => {
      if (newVersionAvailable) {
        const res = confirm('There is a new version available! Would you like to upgrade now? ');
        if (res) {
          this.facadePwaService.update();
        }
      }
    }),
    shareReplay(1),
  );

  public readonly applicationOnline$ = this.facadePwaService.applicationOnline$;

  constructor(private facadePwaService: FacadePwaService) {
    super();
  }

  installApp() {
    this.facadePwaService.promptInstall();
  }

  ngOnInit() {
    this.newVersionAvailable$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  getNotifications() {
    this.facadePwaService.requestPermission();
  }
  sendNotification() {
    this.facadePwaService.sendTokenServer().pipe(take(1)).subscribe();
  }
}
