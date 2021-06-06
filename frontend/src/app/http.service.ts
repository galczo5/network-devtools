import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DTO} from "./dto";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly httpClient: HttpClient) {
  }

  selectData(): Observable<Array<DTO>> {
    return this.httpClient.get('http://localhost:3000/data') as Observable<Array<DTO>>;
  }

  selectName(): Observable<string> {
    return this.httpClient.get('http://localhost:3000/application/name')
      .pipe(map((x: any) => x.name));
  }

  selectVersion(): Observable<string> {
    return this.httpClient.get('http://localhost:3000/application/version')
      .pipe(map((x: any) => x.version + ' @ ' + x.codename));
  }
}
