import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome'

import { AppComponent } from './app.component';
import { NewsDashboardComponent } from './news-dashboard/news-dashboard.component';
import { NewsDjangoService } from './news-django.service';

const appRoutes: Routes = [
  { path: "", redirectTo: "newsdashboard", pathMatch: "full" },
  { path: "newsdashboard", component: NewsDashboardComponent },
]
  
@NgModule({
  declarations: [
    AppComponent,
    NewsDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [NewsDjangoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
