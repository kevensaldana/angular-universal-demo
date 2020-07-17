import {Injectable} from '@angular/core';
import {TrackingErrorJs} from '@shared/infrastructure/tracking-errors/tracking-error-js';

@Injectable({
  providedIn: 'root',
})
export class SendError {
  constructor(private trackingErrorJs: TrackingErrorJs) {

  }
  init() {
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      const errorData = {
        msg: JSON.stringify(msg),
        url,
        lineNo: lineNo ? lineNo : '',
        columnNo: columnNo ? columnNo : '',
        error: error ? JSON.stringify(error) : ''
      };
      this.trackingErrorJs.track(
        JSON.stringify(errorData)
      );
      return false;
    };
  }
}
