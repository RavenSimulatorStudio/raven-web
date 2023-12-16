import { Component, OnInit } from '@angular/core';
import { Customer, SearchCustomer } from '../interface/customer';
import { CustomerService } from '../service/customer.service';
import { LoadingService } from '../service/loading.service';
import { DatetimeService } from '../utilities/datetime.service';
import { ListService } from '../service/list.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {

  searchCustomer: SearchCustomer = {
    workshop: '',
    nickname: ''
  }
  customers!: Customer[];
  workshops!: string[];

  constructor(
    private customerService: CustomerService,
    private loadingService: LoadingService,
    private datetimeService: DatetimeService,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.listService.getWorkshops().subscribe((res) => {
      this.workshops = res;
      this.loadingService.hide();
    });
  }

  onSubmitSearch() {
    this.loadingService.show();
    this.customerService.findAllCustomers(this.searchCustomer).subscribe((res) => {
      this.customers = res;
      this.customers.forEach(customer => {
        customer.timestamp = this.datetimeService.formatDateTime(customer.timestamp);
      });

      this.loadingService.hide();
    })
  }
}
