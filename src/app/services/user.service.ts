import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';
// import{pluck} from 'rxjs/internal/operators'
import { Search } from '../Shared/search.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'https://dummyjson.com/products/search';

  getSearch(search: string): Observable<Search[]> {
    return this.http
      .get<{ products: Search[] }>(this.url + '?q=' + search)
      .pipe(pluck('products'));
  }
}
