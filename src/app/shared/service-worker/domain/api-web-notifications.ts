import {Injectable} from '@angular/core';
import {ApiService} from '@shared/common-infrastructure/api.service';


@Injectable({ providedIn: 'root' })
export class ApiWebNotifications {
  constructor(private apiService: ApiService) {

  }
  push(token = '') {
      return this.apiService.post( '/api/web-push-test', {token});
  }
}
