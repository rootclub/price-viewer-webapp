import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { environment } from '../enviroment';
import {PriceInfo} from '../models/PriceInfo';

@Injectable({
  providedIn: 'root'
})
export class GetPriceService {
  httpClient = inject(HttpClient);

  public get(barcode: string) {
    return this.httpClient.get<PriceInfo>(environment.restUrl + "/" + barcode + "/Price");
  }
}
