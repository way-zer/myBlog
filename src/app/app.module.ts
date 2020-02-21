import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {GraphQLModule} from './graphql.module';
import {PostViewComponent} from './pages/post-view/post-view.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
