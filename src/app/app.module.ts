import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxsModule} from '@ngxs/store';
import {HttpClientModule} from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {environment} from '../environments/environment';
import {CharacterStore} from '@shared/characters/domain/character-store';

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
}
