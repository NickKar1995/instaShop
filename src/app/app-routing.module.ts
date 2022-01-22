import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetailsComponent } from './Pages/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: 'landmarks', pathMatch: 'full' },
  { path: 'landmarks', component: HomeComponent },
  { path: 'landmark/:id/details', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
