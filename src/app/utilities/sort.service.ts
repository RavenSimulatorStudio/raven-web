import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  compareTimestamp(a: number | string, b: number | string, isAsc: boolean) {
    const timestampA = typeof a === 'string' ? Date.parse(a) / 1000 : a;
    const timestampB = typeof b === 'string' ? Date.parse(b) / 1000 : b;

    return (timestampA < timestampB ? -1 : 1) * (isAsc ? 1 : -1);
}

}
