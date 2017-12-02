import { BrowserModule } from '@angular/platform-browser';
import { liveStockComponent } from './live-stock/live-stock.component'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';
import { ChartsModule} from 'ng2-charts'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    liveStockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
