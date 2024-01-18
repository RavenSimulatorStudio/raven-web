import { Component } from '@angular/core';
import { Customer, SearchCustomer } from '../../interface/customer';
import { LoadingService } from '../../service/loading.service';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { NavigateService } from '../../utilities/navigate.service';
import { UpdateWorkshopInfo } from '../../interface/workshop';
import { WorkshopService } from '../../service/workshop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrl: './workshop-detail.component.css'
})
export class WorkshopDetailComponent {
  searchCustomer: SearchCustomer = {
    workshop: '',
    nickname: '',
    status: ''
  }
  customers!: Customer[];
  customersOriginal!: Customer[];
  updateWorkshopInfo: UpdateWorkshopInfo[] = [];
  resultStatus: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private customerService: CustomerService,
    public navigateService: NavigateService,
    private workshopService: WorkshopService
  ) { }
  
  ngOnInit(): void {
    this.loadingService.show();
    this.route.params.subscribe(params => {
      this.searchCustomer.workshop = params['workshopName']
      this.customerService.findAllCustomers(this.searchCustomer).subscribe((res) => {
        this.customers = res.data;
        this.customersOriginal = JSON.parse(JSON.stringify(this.customers));
        this.loadingService.hide();
      })
    });
  }

  async onSubmitSave() {
    this.loadingService.show();
    let chuckList = this.chunkArray(this.customers, 5)
    let chuckOriginalList = this.chunkArray(this.customersOriginal, 5)
    let promises: any[] = [];
    for (let i=0; i<chuckList.length; i++) {
      for (let j=0; j<chuckList[i].length; j++) {
        if (chuckOriginalList[i][j].check_morning !== chuckList[i][j].check_morning || chuckOriginalList[i][j].check_afternoon !== chuckList[i][j].check_afternoon || chuckOriginalList[i][j].remark !== chuckList[i][j].remark) {
          this.updateWorkshopInfo.push({
            id: chuckList[i][j].id,
            check_morning: chuckList[i][j].check_morning,
            check_afternoon: chuckList[i][j].check_morning,
            remark: chuckList[i][j].remark
          })
        }
      }
      console.log("Result: " + this.updateWorkshopInfo)
      let serializedData = JSON.stringify(this.updateWorkshopInfo);
      let encodedData = encodeURIComponent(serializedData);
      console.log("Round " + i + ": " + encodedData)
      
      promises.push(this.saveWorkshopInfo(encodedData));
      this.updateWorkshopInfo = []
    }

    await Promise.all(promises);
    this.loadingService.hide();
    if (this.resultStatus.every(status => status === 200)) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Save success'
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          this.ngOnInit();
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Save failed'
      })
    }
  }

  chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    return result;
  }

  async saveWorkshopInfo(encodedData: string): Promise<void> {
    try {
      const res = await this.workshopService.saveWorkshopInfo(encodedData).toPromise();
      let statusCode: number = res.status;
      this.resultStatus.push(statusCode);
    } catch (error) {
      console.error(error);
    }
  }
}
