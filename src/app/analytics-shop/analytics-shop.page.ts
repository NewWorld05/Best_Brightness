import { Component, OnInit, ViewChild } from '@angular/core';
//import { BaseChartDirective } from 'ng2-charts';

//import { ChartConfiguration } from 'chart.js';
import { NavController } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
//import { ChartDataset } from 'chart.js';
import { Item } from '../models/item.model'; // Import the Item interface
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics-shop',
  templateUrl: './analytics-shop.page.html',
  styleUrls: ['./analytics-shop.page.scss'],
})
export class AnalyticsShopPage implements OnInit {

  //@ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;

  store: Item[] = [];
  title = 'stock Chart';

  // public barChartLegend = true;
  // public barChartPlugins = [];
  // public barChartData: ChartConfiguration<'bar'>['data'] = {
  //   labels: [],
  //   datasets: [] // Initialize datasets array
  // };
  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: true, // Make the chart responsive
  // };

  constructor(private navCtrl: NavController, private inventoryService: InventoryService) { }

  ngOnInit() {
    this.fetchStoreData(); // Fetch initial store data

    // Subscribe to changes in store data
    this.inventoryService.getStore().subscribe(store => {
      this.store = store;
      this.updateChartData(); // Update chart data whenever store data changes
    });
  }

  fetchStoreData() {
    this.inventoryService.getStore().subscribe(res => {
      this.store = res;
      this.updateChartData(); // Update chart data after fetching initial store data
    });
  }

  updateChartData() {
    // if (this.store.length > 0) { // Check if store data is available
    //   const labels = this.store.map(store => store.itemName);
    //   const datasets: ChartDataset<'bar'>[] = [{
    //     data: this.store.map(store => store.quantity || 0), // Use 0 if quantity is not available
    //     label: 'Quantities',
    //   }];
    //   this.barChartData = { labels, datasets };

    //   // Update chart data using BaseChartDirective
    //   if (this.chart && this.chart.chart) {
    //     this.chart.chart.update();
    //   }
    // }

    const ctx = document.getElementById('myChart1') as HTMLCanvasElement;

    // Check if a chart instance already exists
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy(); // Destroy the existing chart
  }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.store.map(item => item.itemName),
        datasets: [{
          label: 'Quantities',
          data: this.store.map(item => item.quantity || 0),
          backgroundColor: this.store.map(item => {
            if (item.quantity === 0) {
              return 'rgba(255, 99, 132, 0.2)'; // Empty
            } else if (item.quantity <= 15) {
              return 'rgba(255, 206, 86, 0.2)'; // Low
            } else {
              return 'rgba(75, 192, 192, 0.2)'; // Sufficient
            }
          }),
          borderColor: this.store.map(item => {
            if (item.quantity === 0) {
              return 'rgba(255, 99, 132, 1)';
            } else if (item.quantity <= 15) {
              return 'rgba(255, 206, 86, 1)';
            } else {
              return 'rgba(75, 192, 192, 1)';
            }
          }),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
