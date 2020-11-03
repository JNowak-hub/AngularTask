import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/addNewClient/register.component';
import {ClockComponent} from './components/clock/clock.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {SubcategoryselectComponent} from './components/subcategoryselect/subcategoryselect.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { ControllPanelComponent } from './components/controll-panel/controll-panel.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  {path: 'controlPanel/addClient', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'controlPanel', component: ControllPanelComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    RegisterComponent,
    ClockComponent,
    NavbarComponent,
    SubcategoryselectComponent,
    HomeComponent,
    ControllPanelComponent,
    RegisterUserComponent,
    LoginComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
