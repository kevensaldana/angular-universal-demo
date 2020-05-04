import {Injectable, PLATFORM_ID, APP_ID, Inject} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import {of} from 'rxjs';
import {ApiService} from '@shared/common-infrastructure/api.service';
import {ResponseCharacter} from '@shared/characters/domain/response-character';

const STATE_KEY_ITEMS = makeStateKey('ResponseCharacter');

@Injectable({ providedIn: 'root' })
export class ApiCharacters {
  constructor(private apiService: ApiService, private state: TransferState,
              @Inject(PLATFORM_ID) private platformId: object,
              @Inject(APP_ID) private appId: string) {

  }
  fetch() {
    const res = this.state.get<ResponseCharacter>(STATE_KEY_ITEMS, new ResponseCharacter());
    if (res.result.length === 0) {
      return this.apiService.get<ResponseCharacter>( '/api/list-characters').pipe(tap((data) => {
        this.state.set(STATE_KEY_ITEMS, data);
      }));
    } else {
      return of(res);
    }

  }
}
