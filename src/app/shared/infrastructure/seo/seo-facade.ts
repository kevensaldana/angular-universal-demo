import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {SeoRepository} from '@shared/infrastructure/seo/seo-repository';

@Injectable({ providedIn: 'root' })
export class SeoFacade {
    constructor( private titleService: Title, private metaService: Meta) {

    }
    addTags() {
      this.titleService.setTitle(SeoRepository.title);
      this.metaService.addTags(SeoRepository.list());
    }
}
