import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {ClockComponent} from './components/clock/clock.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {SubcategoryselectComponent} from './components/subcategoryselect/subcategoryselect.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { ControllPanelComponent } from './components/controll-panel/controll-panel.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'controlPanel', component: ControllPanelComponent}
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
