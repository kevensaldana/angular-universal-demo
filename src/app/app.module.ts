import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxsModule} from '@ngxs/store';
import { CharacterStore } from './shared/domain/character-store';
import {HttpClientModule} from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {environment} from '../environments/environment';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
