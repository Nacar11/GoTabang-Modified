import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import json from 'highlight.js/lib/languages/json';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { AlertDialogComponent } from './pages/home/homeComponents/alert-dialog/alert-dialog.component';
import { AlertFileComponent } from './pages/home/homeComponents/alert-file/alert-file.component';
import { LevelFileComponent } from './pages/home/homeComponents/level-file/level-file.component';
import { PostDisasterComponent } from './pages/home/homeComponents/post-disaster/post-disaster.component';
import { TypeFileComponent } from './pages/home/homeComponents/type-file/type-file.component';
import { UploadDialogComponent } from './pages/home/homeComponents/upload-dialog/upload-dialog.component';
import { UploadFileComponent } from './pages/home/homeComponents/upload-file/upload-file.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AdminNavComponent } from './pages/admin/admin-nav/admin-nav.component';
import { AdminViewComponent } from './pages/admin/admin-view/admin-view.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    LoadingComponent,
    ErrorComponent,
    ToolbarComponent,
    LevelFileComponent,
    UploadFileComponent,
    UploadDialogComponent,
    SigninComponent,
    AlertDialogComponent,
    AlertFileComponent,
    TypeFileComponent,
    PostDisasterComponent,
    AdminNavComponent,
    AdminViewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HighlightModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTableModule
    
    
  ],
  providers: [
    AngularFireDatabase,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
