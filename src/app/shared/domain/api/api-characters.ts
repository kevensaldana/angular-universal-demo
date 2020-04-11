import {Injectable} from '@angular/core';
import {ResponseCharacter} from './response-character';
import {ApiService} from '../api.service';

@Injectable({ providedIn: 'root' })
export class ApiCharacters {
  constructor(private apiService: ApiService) {

  }
  fetch() {
    this.apiService.get<ResponseCharacter>('/api/list-new');
  }
}
