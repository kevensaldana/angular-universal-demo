import { Component } from '@angular/core';
import {FacadePwaService} from '@shared/infrastructure/sw/facade-pwa.service';
import {shareReplay, takeUntil, tap} from 'rxjs/operators';
import {BaseComponent} from '@shared/infrastructure/ui/base.component';

@Component({
  templateUrl: './shared-layout.component.html'
})
export class SharedLayoutComponent  extends BaseComponent {
  public readonly applicationInstallable$ = this.facadePwaService.applicationInstallable$;
  public readonly isStandAlone = this.facadePwaService.runningStandAlone;
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

  install_app() {
    this.facadePwaService.promptInstall();
  }

  ngOnInit() {
    this.newVersionAvailable$.pipe(takeUntil(this.destroy$)).subscribe();
  }
}
