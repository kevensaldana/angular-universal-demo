

export class SeoRepository {
  static description = 'Angular Universal Example';
  static title = 'Angular Universal Demo';
  static url = 'https://angular.kevensaldana.com';
  static urlImage = 'https://kevensaldana.com/icons/icon-512x512.png';
  static list() {
    return  [
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=3.0'},
      {name: 'description', content: SeoRepository.description},
      {name: 'author', content: 'Keven'},
      {name: 'og:title', content: SeoRepository.title},
      {name: 'og:description', content: SeoRepository.description},
      {name: 'og:type', content: 'website' },
      {name: 'og:locale', content: 'en_US' },
      {name: 'og:url', content: SeoRepository.url},
      {name: 'og:image', content: SeoRepository.urlImage},
      {name: 'og:image:width', content: '512'},
      {name: 'og:image:height', content: '512'},
      {name: 'og:site_name', content: SeoRepository.title},
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:title', content: SeoRepository.title},
      {name: 'twitter:domain', content: SeoRepository.url},
      {name: 'twitter:url', content: SeoRepository.url},
      {name: 'twitter:image', content: SeoRepository.urlImage}
      ];
  }
}
