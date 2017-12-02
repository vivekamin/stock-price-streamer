import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable()
export class liveStockService {
  url = "https://api.iextrading.com/1.0/stock/market/batch?symbols="
  constructor(private http: HttpClient) {  }
  getStockPrice(listofStock){
    //alert(listofStock)
    return this.http.get(this.url+listofStock+'&types=quote')
  }
}
