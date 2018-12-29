import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserIdleModule } from 'angular-user-idle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvancementComponent } from './components/avancement/avancement.component';
import { AlarmSettingComponent } from './components/home-io-components/alarm-setting/alarm-setting.component';
import { LightsSwitcherComponent } from './components/home-io-components/lights-switcher/lights-switcher.component';
import { SmartLightComponent } from './components/home-io-components/smart-light/smart-light.component';
import { TimePickerComponent } from './components/home-io-components/time-picker/time-picker.component';
import { ZoneLightComponent } from './components/home-io-components/zone-light/zone-light.component';
import { CardIncidentComponent } from './components/incident/card-incident/card-incident.component';
import { NgbdModalComponent, NgbdModalContent, NgbdModalModif, NgbdModalNotif } from './components/incident/incident-details/incident-details.component';
import { IncidentListComponent } from './components/incident/incident-list/incident-list.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CardNotificationComponent } from './components/notification/card-notification/card-notification.component';
import { NotificationListComponent } from './components/notification/notification-list/notification-list.component';
import { PopupComponent } from './components/popup/popup.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SubNavBarComponent } from './components/sub-nav-bar/sub-nav-bar.component';
import { CardUserComponent } from './components/user/card-user/card-user.component';
import { AddingDialog, UserAddComponent } from './components/user/user-add/user-add.component';
import { ModificationDialog, UserChangeComponent } from './components/user/user-change/user-change.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { GravityGaugeComponent } from './components/utils/gravity-gauge/gravity-gauge.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { IoPanelComponent } from './pages/io-panel/io-panel.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VisualiserComponent } from './pages/visualiser/visualiser.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { OrderBy } from './pipes/orderBy.pipe';
import { searchPipe } from './pipes/Search.pipe';
import { userMishapPipe } from './pipes/user-from-mishap.pipe';
import { userPipe } from './pipes/user.pipe';
import { AlertService } from './services/alert.service';
import { AuthentificationService } from './services/authentification.service';
import { FilterService } from './services/filter.service';
import { IncidentService } from "./services/incident.service";
import { IotService } from './services/iot.service';
import { NotificationService } from "./services/notification.service";
import { UserService } from './services/user.service';


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NavBarComponent,
    SideBarComponent,
    IncidentListComponent,
    AuthComponent,
    VisualiserComponent,
    LoginComponent,
    searchPipe,
    userPipe,
    userMishapPipe,
    OrderBy,
    PopupComponent,
    NgbdModalComponent,
    NgbdModalContent,
    NgbdModalModif,
    NgbdModalNotif,
    FilterPipePipe,
    IncidentListComponent,
    CardIncidentComponent,
    GravityGaugeComponent,
    NotificationListComponent,
    AvancementComponent,
    SettingsComponent,
    SubNavBarComponent,
    CardUserComponent,
    CardNotificationComponent,
    UserChangeComponent,
    ModificationDialog,
    UserAddComponent,
    AddingDialog,
    UserInfoComponent,
    IoPanelComponent,
    ZoneLightComponent,
    AlarmSettingComponent,
    LightsSwitcherComponent,
    TimePickerComponent,
    SmartLightComponent,
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    UserIdleModule.forRoot({ idle: 10, timeout: 5, ping: 120 }),
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatRadioModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    MatSlideToggleModule,
  ],
  providers: [
    IncidentService,
    UserService,
    IncidentService,
    IotService,
    NotificationService,
    AuthentificationService,
    AlertService,
    FilterService,
    AuthGuard,
    AuthGuard,
    [{ provide: MAT_DIALOG_DATA, useValue: { hasBackdrop: false } },
    { provide: MatDialogRef, useValue: {} }],
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  entryComponents: [PopupComponent, NgbdModalContent, NgbdModalModif, ModificationDialog, NgbdModalNotif, AddingDialog],
  bootstrap: [AppComponent],
})
export class AppModule { }
