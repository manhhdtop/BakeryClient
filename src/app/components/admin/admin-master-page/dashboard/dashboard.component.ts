import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { DashboardOverview } from 'src/app/shared/model/dashboard-overview';
import { ToastService } from 'src/app/service/toast.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardOverview: DashboardOverview;
  chart: any;

  constructor(
    private dashboardService: DashboardService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.configChart();
    this.dashboardService.getDashboardOverview().subscribe(res => {
      if (res.errorCode === '200') {
        this.dashboardOverview = res.data;
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  private configChart(): void {
    this.chart = {};
    this.chart.title = 'Earnings';
    this.chart.type = ChartType.Line;
    this.chart.data = [
      ['Jan', 0],
      ['Feb', 10000],
      ['Mar', 5000],
      ['Apr', 15000],
      ['May', 10000],
      ['Jun', 20000],
      ['Jul', 15000],
      ['Aug', 25000],
      ['Sep', 20000],
      ['Oct', 30000],
      ['Nov', 25000],
      ['Dec', 40000],
    ];
    this.chart.dynamicResize = true;
  }
}
