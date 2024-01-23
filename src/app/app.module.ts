import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { HomeComponent } from './home/home.component';
import { PendingPaymentComponent } from './pending-payment/pending-payment.component';
import { CustomerService } from './service/customer.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LecturersListComponent } from './lecturers-list/lecturers-list.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { LecturerDetailComponent } from './lecturer-detail/lecturer-detail.component';
import { WorkshopListComponent } from './report/workshop-list/workshop-list.component';
import { WorkshopDetailComponent } from './report/workshop-detail/workshop-detail.component';
import { CertificateComponent } from './report/certificate/certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    HomeComponent,
    PendingPaymentComponent,
    LoadingComponent,
    LoginComponent,
    CustomerDetailComponent,
    LecturersListComponent,
    LecturerDetailComponent,
    WorkshopListComponent,
    WorkshopDetailComponent,
    CertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    TypeaheadModule.forRoot()
  ],
  providers: [
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
