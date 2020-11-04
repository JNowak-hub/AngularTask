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
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
