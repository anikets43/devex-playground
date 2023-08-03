import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DxPivotGridModule, DxChartModule } from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DxPivotGridModule, DxChartModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
