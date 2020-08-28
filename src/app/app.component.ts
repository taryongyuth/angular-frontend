import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from './countries.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  term: string;
  datas = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {

    this.countriesService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.datas = data;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
