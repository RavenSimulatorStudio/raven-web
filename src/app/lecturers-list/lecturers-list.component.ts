import { Component } from '@angular/core';
import { Lecturer, SearchLecturer } from '../interface/lecturer';
import { Sort } from '@angular/material/sort';
import { SortService } from '../utilities/sort.service';
import { LoadingService } from '../service/loading.service';
import { AutocompleteService } from '../service/autocomplete.service';
import { Observable, Observer, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-lecturers-list',
  templateUrl: './lecturers-list.component.html',
  styleUrl: './lecturers-list.component.css'
})
export class LecturersListComponent {

  searchLecturer: SearchLecturer = {
    career: '',
    nickname: '',
    productType: ''
  }

  lecturers!: Lecturer[];
  sortedData!: Lecturer[];
  suggestion$?: Observable<string[]>;

  constructor(
    private loadingService: LoadingService,
    private sortService: SortService,
    private autocompleteService: AutocompleteService
  ) {}

  ngOnInit(): void {
    this.suggestion$ = new Observable((observable: Observer<string | undefined>) => {
      observable.next(this.searchLecturer.career)
    }).pipe(
      debounceTime(300),
      switchMap((query: string) => {
        if (query) {
          return this.autocompleteService.getCareersAutocompleteSuggestions(query)
            .pipe(
              switchMap(response => of(response.data.suggestions))
            );
        }
        return of([]);
      })
    )
  }

  onSubmitSearch() {
    console.log(this.searchLecturer)
  }

  sortData(sort: Sort) {
    const data = this.lecturers.slice();
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

  typeAheadOnSelect(event: any) {
    this.searchLecturer.career = event.item;
  }
}
