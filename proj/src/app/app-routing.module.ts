import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LevelFileComponent } from './pages/home/homeComponents/level-file/level-file.component';
import { UploadFileComponent } from './pages/home/homeComponents/upload-file/upload-file.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: "homescreen/dashboard",
    pathMatch: "full"
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'homescreen',
    component: NavBarComponent,
    children: [
      {path: 'dashboard', component: HomeComponent, },
      { path: 'upload2', component:  UploadFileComponent },
      { path: 'level', component:  LevelFileComponent },
      // { path: 'alert', component:  AlertFileComponent, canActivate: [AuthGuard]},
      // { path: 'post-disaster', component:  PostDisasterComponent, canActivate: [AuthGuard]}
 ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
