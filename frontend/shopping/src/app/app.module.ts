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
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthService } from './services/auth.service';
import { ReviewService } from './services/review.service';
import { ReviewComponent } from './components/review/review.component';
import { RatingComponent } from './components/rating/rating.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AddProductComponent } from './components/add-product/add-product.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { OrderStatusText } from './pipes/order-status-text.pipe';
import { BasketComponent } from './components/basket/basket.component';
import { AuthGuard } from './guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    OrdersHistoryComponent,
    ProductCardComponent,
    NavbarComponent,
    OrdersComponent,
    LoginComponent,
    ProductDetailsComponent,
    ReviewComponent,
    RatingComponent,
    TruncatePipe,
    OrderStatusPipe,
    OrderStatusText,
    AddProductComponent,
    OrderCardComponent,
    BasketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ProductsService,
    CustomerService,
    OrderService,
    OrderItemService,
    AuthService,
    ReviewService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
