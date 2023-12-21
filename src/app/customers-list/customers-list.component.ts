import { Component, OnInit } from '@angular/core';
import { ApproveStatus, Customer, SearchCustomer } from '../interface/customer';
import { CustomerService } from '../service/customer.service';
import { LoadingService } from '../service/loading.service';
import { DatetimeService } from '../utilities/datetime.service';
import { ListService } from '../service/list.service';
import { Sort } from '@angular/material/sort';
import { SortService } from '../utilities/sort.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements OnInit {

  searchCustomer: SearchCustomer = {
    workshop: '',
    nickname: '',
    status: ''
  }
  customers!: Customer[];
  workshops!: string[];
  approveStatus: ApproveStatus = {
    id: '',
    approval: localStorage.getItem('nickname') || '',
    status: 'cancel'
  }

  sortedData!: Customer[];

  constructor(
    private customerService: CustomerService,
    private loadingService: LoadingService,
    private datetimeService: DatetimeService,
    private listService: ListService,
    private sortService: SortService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.listService.getWorkshops().subscribe((res) => {
      this.workshops = res.data.workshops;
      this.loadingService.hide();
    });
  }

  onSubmitSearch() {
    this.loadingService.show();
    this.customerService.findAllCustomers(this.searchCustomer).subscribe((res) => {
      this.customers = res.data;
      this.customers.forEach(customer => {
        customer.timestamp = this.datetimeService.formatDateTime(customer.timestamp);
      });
      this.sortedData = this.customers.slice();

      this.loadingService.hide();
    })
  }

  sortData(sort: Sort) {
    const data = this.customers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'timestamp':
          return this.sortService.compareTimestamp(a.timestamp, b.timestamp, isAsc);
        default:
          return 0;
      }
    });
  }
}
