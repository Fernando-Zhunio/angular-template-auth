import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './shared/services/storage.service';
import { CustomInterceptor } from './shared/class/custom.interceptor';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';


function initializeApp(storage: StorageService): any {
  return () => {
    const session = storage.getSessionLocalStorage();
    console.log(session);
    if (session) {
      storage.setSession(session);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutAdminComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [StorageService],
      multi: true,
    }
  ],
})
export class AppModule { }
