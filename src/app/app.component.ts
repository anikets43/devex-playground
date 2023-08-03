import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';
import { DxPivotGridComponent } from 'devextreme-angular/ui/pivot-grid';
import { LoadOptions } from 'devextreme/data';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { lastValueFrom, map } from 'rxjs';

interface Sale {
  id: number;
  region: string;
  country: string;
  city: string;
  amount: number;
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private http = inject(HttpClient);

  @ViewChild(DxPivotGridComponent, { static: false })
  pivotGrid!: DxPivotGridComponent;

  @ViewChild(DxChartComponent, { static: false }) chart!: DxChartComponent;

  pivotGridDataSource: any = {
    fields: [
      {
        caption: 'Region',
        width: 120,
        dataField: 'region',
        area: 'row',
        sortBySummaryField: 'Total',
      },
      {
        caption: 'City',
        dataField: 'city',
        width: 150,
        area: 'row',
      },
      {
        dataField: 'date',
        dataType: 'date',
        area: 'column',
      },
      {
        groupName: 'date',
        groupInterval: 'month',
        visible: false,
      },
      {
        caption: 'Total',
        dataField: 'amount',
        dataType: 'number',
        summaryType: 'sum',
        format: 'currency',
        area: 'data',
      },
    ],
    store: new CustomStore({
      load: (_loadOption: LoadOptions) => {
        debugger;
        return lastValueFrom(this.http.get('data.json'));
      },
    }),
  };

  constructor() {
    this.customizeTooltip = this.customizeTooltip.bind(this);
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false,
    });

    setTimeout(() => {
      const dataSource = this.pivotGrid.instance.getDataSource();
      dataSource.expandHeaderItem('row', ['North America']);
      dataSource.expandHeaderItem('column', [2013]);
    }, 0);
  }

  customizeTooltip(args: any) {
    return {
      html: `${args.seriesName} | Total<div class='currency'>${args.valueText}</div>`,
    };
  }
}
