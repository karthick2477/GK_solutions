import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsDesignComponent } from './products-design/products-design.component';
import { LandingHomePageComponent } from './landing-home-page/landing-home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalModule } from './_modal';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LoginComponent } from './login/login.component';
import { AdminDesignPageComponent } from './admin-design-page/admin-design-page.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AuthGuard } from './login/guards/Auth.guard'
import {NgxImageCompressService} from 'ngx-image-compress';
@NgModule({
  declarations: [
    AppComponent,
    ProductsDesignComponent,
    LandingHomePageComponent,
    NavbarComponent,
    FooterComponent,
    ContactFormComponent,
    LoginComponent,
    AdminDesignPageComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthGuard,NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
