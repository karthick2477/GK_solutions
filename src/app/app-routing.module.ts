import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LandingHomePageComponent } from './landing-home-page/landing-home-page.component';

import { ProductsDesignComponent } from './products-design/products-design.component';


const routes: Routes = [
  {
    path:'',
    component:LandingHomePageComponent

  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path:'Designs',
    component:ProductsDesignComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
