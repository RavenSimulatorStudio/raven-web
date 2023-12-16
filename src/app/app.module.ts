import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { HomeComponent } from './home/home.component';
import { PendingPaymentComponent } from './pending-payment/pending-payment.component';
import { PaidPaymentComponent } from './paid-payment/paid-payment.component';
import { CustomerService } from './service/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    HomeComponent,
    PendingPaymentComponent,
    PaidPaymentComponent,
    LoadingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
