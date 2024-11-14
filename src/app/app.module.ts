import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi, HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductsComponent } from './features/products/products.component';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { UserLoginComponent } from './features/user-login/user-login.component';
import { PreloadVideoComponent } from './preload-video/preload-video.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './home/home.component';

// Import ngx-translate modules
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsersListComponent } from './users-list/users-list.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { VipComponent } from './vip/vip.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VipofferComponent } from './vipoffer/vipoffer.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { EditProfileComponent } from './features/edit-profile/edit-profile.component';
import { ItemCountComponent } from './item-count/item-count.component';
import { CartComponent } from './cart/cart.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    PreloadVideoComponent,
    HeaderComponent,
    HomeComponent,
    UsersListComponent,
    FooterComponent,
    ShopComponent,
    AddProductComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    VipComponent,
    DashboardComponent,
    VipofferComponent,
    SubscriptionComponent,
    EditProfileComponent,
    ItemCountComponent,
    CartComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
   
    MatSnackBarModule,
    HttpClientModule, // Add HttpClientModule here
    TranslateModule.forRoot({ // Add TranslateModule configuration
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
