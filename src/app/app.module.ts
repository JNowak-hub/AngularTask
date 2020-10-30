import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ClockComponent } from './components/clock/clock.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import { SubcategoryselectComponent } from './components/subcategoryselect/subcategoryselect.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    RegisterComponent,
    ClockComponent,
    NavbarComponent,
    SubcategoryselectComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
