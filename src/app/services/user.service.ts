import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';
// import{pluck} from 'rxjs/internal/operators'
import { Search, SearchRes } from '../Shared/search.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url = 'https://dummyjson.com/products/search';

  getSearch(search: string): Observable<Search[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("q",search);
    return this.http
      .get<{ products: Search[] }>(this.url + '?q=' + search)
      .pipe(pluck('products'));
  }

  getProducts ():Observable<Search[]>{
    return this.http.get<SearchRes<Search[]>>('https://dummyjson.com/products').pipe(pluck('products'));
  }
}
   