// General Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import json from 'highlight.js/lib/languages/json';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { NgChartsModule } from 'ng2-charts';
import { environment as env } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';

// Firebase Imports
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

// Angular-Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

// App Component Imports
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AdminImagesComponent } from './pages/admin/admin-images/admin-images.component';
import { AdminNavComponent } from './pages/admin/admin-nav/admin-nav.component';
import { AdminRetrainComponent } from './pages/admin/admin-retrain/admin-retrain.component';
import { AdminStatsComponent } from './pages/admin/admin-stats/admin-stats.component';
import { AdminViewComponent } from './pages/admin/admin-view/admin-view.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { AlertDialogComponent } from './pages/home/homeComponents/alert-dialog/alert-dialog.component';
import { AlertFileComponent } from './pages/home/homeComponents/alert-file/alert-file.component';
import { LevelFileComponent } from './pages/home/homeComponents/level-file/level-file.component';
import { PostDisasterComponent } from './pages/home/homeComponents/post-disaster/post-disaster.component';
import { TypeFileComponent } from './pages/home/homeComponents/type-file/type-file.component';
import { UploadDialogComponent } from './pages/home/homeComponents/upload-dialog/upload-dialog.component';
import { UploadFileComponent } from './pages/home/homeComponents/upload-file/upload-file.component';
import {UploadDamageDialogComponent} from './pages/home/homeComponents/upload-damage-dialog/upload-damage-dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UploadVerificationDialogComponent } from './pages/home/homeComponents/upload-verification-dialog/upload-verification-dialog.component';
import { AdminTrainComponent } from './pages/admin/admin-train/admin-train.component';

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
    AlertDialogComponent,
    AlertFileComponent,
    UploadDamageDialogComponent,
    TypeFileComponent,
    PostDisasterComponent,
    AdminNavComponent,
    AdminViewComponent,
    AdminImagesComponent,
    AdminStatsComponent,
    AdminRetrainComponent,
    SigninComponent,
    UploadVerificationDialogComponent,
    AdminTrainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HighlightModule,
    FontAwesomeModule,
    FormsModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
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
    MatTableModule,
    MatIconModule,
    NgChartsModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyBM-LFSIhLFRpKM63cWpJeWWJwdNQKcgqo",
        authDomain: "gotabang.firebaseapp.com",
        projectId: "gotabang",
        storageBucket: "gotabang.appspot.com",
        messagingSenderId: "160977774494",
        appId: "1:160977774494:web:2449ac00278a754122d88f"
      }
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    
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
