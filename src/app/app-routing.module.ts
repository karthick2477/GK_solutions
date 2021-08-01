import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AdminDesignPageComponent } from './admin-design-page/admin-design-page.component';
import { LandingHomePageComponent } from './landing-home-page/landing-home-page.component';
import { AuthGuard } from './login/guards/Auth.guard';
import { LoginComponent } from './login/login.component';
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
  {
      path:'Admin/Login',
      component:LoginComponent
    
  },
  {
    path:"AdminDesignPageComponent",
    component:AdminDesignPageComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
