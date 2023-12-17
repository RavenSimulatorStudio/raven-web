import { Component, OnInit } from '@angular/core';
import { ApproveStatus, Customer, SearchCustomer } from '../interface/customer';
import { CustomerService } from '../service/customer.service';
import { LoadingService } from '../service/loading.service';
import { DatetimeService } from '../utilities/datetime.service';
import { ListService } from '../service/list.service';
import Swal from 'sweetalert2';

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
    approval: 'test',
    status: 'cancel'
  }

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

  onSubmitCancel(id: string) {
    Swal.fire({
      icon: 'info',
      title: 'Confirm?',
      confirmButtonText: "confirm",
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.approveStatus.id = id
        this.onConfirmCancel()
      }
    });
  }

  onConfirmCancel() {
    this.loadingService.show();
    this.customerService.updateStatus(this.approveStatus).subscribe((res) => {
      this.loadingService.hide();
      if (res && res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Cancel success'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Cancel failed'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.ngOnInit();
          }
        });
      }
    });
  }
}
