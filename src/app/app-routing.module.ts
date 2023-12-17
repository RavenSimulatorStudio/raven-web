import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PendingPaymentComponent } from './pending-payment/pending-payment.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {   
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'customers/all', 
        component: CustomersListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'customers/pending', 
        component: PendingPaymentComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
