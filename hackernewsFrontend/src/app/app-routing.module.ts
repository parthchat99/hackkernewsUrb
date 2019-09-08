import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsDashboardComponent } from './news-dashboard/news-dashboard.component';

const routes: Routes = [
  {
		path: 'newsdashboard',
		component: NewsDashboardComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }