import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsService } from './services/products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from './services/customer.service';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ProductsService, CustomerService, OrderService, OrderItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
