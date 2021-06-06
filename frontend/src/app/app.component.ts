import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "./http.service";
import {interval, Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {DTO} from "./dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  data: Array<DTO> = [];
  name: string = '';
  version: string = '';

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly httpService: HttpService) {
  }

  ngOnInit() {
    interval(5000)
      .pipe(
        switchMap(() => this.httpService.selectData()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(data => this.data = data)

    this.httpService.selectName()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => this.name = data)

    this.httpService.selectVersion()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => this.version = data)
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
