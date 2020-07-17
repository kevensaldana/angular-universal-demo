import {Injectable} from '@angular/core';
import {fromEvent, merge} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckApplicationOnline {
  check() {
    return merge(
      fromEvent(window, 'offline'),
      fromEvent(window, 'online'),
    ).pipe(
      map(() => navigator.onLine),
      startWith(true),
    );
  }
}
