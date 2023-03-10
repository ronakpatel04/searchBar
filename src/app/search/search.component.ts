import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  pluck,
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
export class SearchComponent implements AfterViewInit, OnInit {
  @ViewChild('searchBar')
  searchbar: ElementRef | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  data: Search[] = [];
  search = false;
  searchQuery: any;
  response: Search[] = [];
  ngOnInit(): void {
    // this.userService.getProducts().subscribe((res) =>{this.response = res , console.log(this.response)});
    // this.route.queryParams.subscribe((qp) => {
    //   this.searchQuery = qp['q'];
    //   console.log(this.searchQuery);
    // });
  }

  ngAfterViewInit(): void {
    if (!this.search) {
      const search = fromEvent<any>(this.searchbar?.nativeElement, 'keyup')
        .pipe(
          map((event) => event.target.value),
          tap((res) => {
            if (!res) {
              this.search = true;
              this.router.navigate(['search']);
            } else {
              this.search = false;
              this.router.navigate(['search'], { queryParams: { q: res } });
            }
          }),
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((res) => this.userService.getSearch(res))
        )
        .subscribe((res) => {
          (this.data = res), console.log(search);
        });
    } else {
      this.search = true;
      this.userService.getProducts().subscribe((res) => (this.response = res));
    }
  }
}
