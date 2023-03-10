import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { UserService } from '../services/user.service';
import { Search } from '../Shared/search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchBar')
  searchbar: ElementRef | null = null;

  constructor(private userService: UserService) {}
  data: Search[] = [];

  ngAfterViewInit(): void {
    const search = fromEvent<any>(this.searchbar?.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((res) => this.userService.getSearch(res))
      )
      .subscribe((res) => (this.data = res));
  }
}
