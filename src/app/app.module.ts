import { BrowserModule } from '@angular/platform-browser';
import {Inject, NgModule, PLATFORM_ID, APP_ID} from '@angular/core';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxsModule} from '@ngxs/store';
import { CharacterStore } from './shared/domain/character-store';
import {HttpClientModule} from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {environment} from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: !environment.production
    }),
    NgxsModule.forRoot([CharacterStore], {
      developmentMode: !environment.production
    }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(APP_ID) private appId
  ) {
    const platform = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
    console.log('I\'m on the ', platform);
  }
}
