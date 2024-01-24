import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SearchWorkshop, Workshop } from '../../interface/workshop';
import { LoadingService } from '../../service/loading.service';
import { WorkshopService } from '../../service/workshop.service';
import { DatetimeService } from '../../utilities/datetime.service';
import { Observable, Observer, debounceTime, of, switchMap } from 'rxjs';
import { AutocompleteService } from '../../service/autocomplete.service';
import { SortService } from '../../utilities/sort.service';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrl: './workshop-list.component.css'
})
export class WorkshopListComponent {
  searchWorkshop: SearchWorkshop = {
    workshop: '',
    status: 'Active'
  }
  workshops!: Workshop[];
  suggestion$?: Observable<string[]>;
  sortedData!: Workshop[];

  constructor(
    private loadingService: LoadingService,
    private workshopService: WorkshopService,
    private datetimeService: DatetimeService,
    private autocompleteService: AutocompleteService,
    private sortService: SortService
  ) {}

  ngOnInit(): void {
    this.suggestion$ = new Observable((observable: Observer<string | undefined>) => {
      observable.next(this.searchWorkshop.workshop)
    }).pipe(
      debounceTime(300),
      switchMap((query: string) => {
        if (query) {
          return this.autocompleteService.getWorkshopsAutocompleteSuggestions(query)
            .pipe(
              switchMap(response => of(response.data.suggestions))
            );
        }
        return of([]);
      })
    )
  }

  onSubmitSearch() {
    this.loadingService.show();
    this.workshopService.findWorkshops(this.searchWorkshop).subscribe((res) => {
      this.workshops = res.data
      this.workshops.forEach(workshop => {
        workshop.workshop_date = this.datetimeService.formatDateInfo(workshop.workshop_date);
      });
      this.sortedData = this.workshops.slice()
      this.loadingService.hide();
    })
  }

  typeAheadOnSelect(event: any) {
    this.searchWorkshop.workshop = event.item;
  }

  sortData(sort: Sort) {
    const data = this.workshops.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return this.sortService.compareDate(a.workshop_date, b.workshop_date, isAsc);
        default:
          return 0;
      }
    });
  }
}
