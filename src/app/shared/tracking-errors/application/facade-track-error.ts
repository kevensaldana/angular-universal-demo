import {SendError} from '@shared/tracking-errors/domain/send-error';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacadeTrackError {
  constructor(private sendError: SendError) {
    this.sendError.init();
  }
}
