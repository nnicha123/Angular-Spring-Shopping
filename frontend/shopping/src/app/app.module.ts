import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthService } from './services/auth.service';
import { ReviewService } from './services/review.service';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProfileComponent,
    ProductCardComponent,
    NavbarComponent,
    OrdersComponent,
    LoginComponent,
    ProductDetailsComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductsService,
    CustomerService,
    OrderService,
    OrderItemService,
    AuthService,
    ReviewService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
