
import {Injectable} from '@angular/core';
import {SendError} from '@shared/infrastructure/tracking-errors/send-error';

@Injectable({
  providedIn: 'root',
})
export class FacadeTrackError {
  constructor(private sendError: SendError) {
  }
  listenErrors() {
    this.sendError.init();
  }
}
