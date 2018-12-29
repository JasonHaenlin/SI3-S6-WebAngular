import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { IoPanelComponent } from './pages/io-panel/io-panel.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VisualiserComponent } from './pages/visualiser/visualiser.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'visualiser', component: VisualiserComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'iotpanel', component: IoPanelComponent, canActivate: [AuthGuard] },


  // otherwise redirect to home
  { path: '**', redirectTo: 'visualiser' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
