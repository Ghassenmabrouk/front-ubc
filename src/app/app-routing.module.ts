import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { UserLoginComponent } from './features/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ShopComponent } from './shop/shop.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { VipComponent } from './vip/vip.component';


/////guards///////
import { VipGuard } from './guards/guards/vip.guard';
import { adminmodGuard } from './guards/guards/adminmod.guard';
import { AdminGuard } from './guards/guards/admin.guard';
import { modGuard } from './guards/guards/mod.guard';
import { EditProfileComponent } from './features/edit-profile/edit-profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CartComponent } from './cart/cart.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'cart', component: CartComponent },

  { path: 'product', component: ProductsComponent, canActivate: [adminmodGuard] },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'userslist', component: UsersListComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'add-product', component: AddProductComponent , canActivate: [adminmodGuard]},
  { path: 'services', component: ServicesComponent },
  { path: 'vip', component: VipComponent, canActivate: [VipGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
