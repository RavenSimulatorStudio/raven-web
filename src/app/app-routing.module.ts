import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PendingPaymentComponent } from './pending-payment/pending-payment.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LecturersListComponent } from './lecturers-list/lecturers-list.component';
import { LecturerDetailComponent } from './lecturer-detail/lecturer-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {   
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
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
      },
      { 
        path: 'customers/:id', 
        component: CustomerDetailComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'lecturers/all', 
        component: LecturersListComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'lecturers/:id', 
        component: LecturerDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
