import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AdminImagesComponent } from './pages/admin/admin-images/admin-images.component';
import { AdminNavComponent } from './pages/admin/admin-nav/admin-nav.component';
import { AdminRetrainComponent } from './pages/admin/admin-retrain/admin-retrain.component';
import { AdminStatsComponent } from './pages/admin/admin-stats/admin-stats.component';
import { AdminViewComponent } from './pages/admin/admin-view/admin-view.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { AlertFileComponent } from './pages/home/homeComponents/alert-file/alert-file.component';
import { LevelFileComponent } from './pages/home/homeComponents/level-file/level-file.component';
import { PostDisasterComponent } from './pages/home/homeComponents/post-disaster/post-disaster.component';
import { UploadFileComponent } from './pages/home/homeComponents/upload-file/upload-file.component';
import { ProfileComponent } from './pages/profile/profile.component';



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
      { path: 'upload2', component:  UploadFileComponent, canActivate: [AuthGuard] },
      { path: 'level', component:  LevelFileComponent, canActivate: [AuthGuard]},
      { path: 'alert', component:  AlertFileComponent, canActivate: [AuthGuard]},
      { path: 'post-disaster', component:  PostDisasterComponent, canActivate: [AuthGuard]}
 ]},

 {
  path: 'admin',
  component: AdminNavComponent,
  children: [
    {path: 'dashboard', component: AdminViewComponent, },
    {path: 'images', component: AdminImagesComponent, },
    {path: 'stats', component: AdminStatsComponent, },
    {path: 'retrain', component: AdminRetrainComponent, },
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
