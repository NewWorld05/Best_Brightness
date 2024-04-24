import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  inventoryData!: any[];

  // Chart properties
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.getInventoryData();
  }

  getInventoryData() {
    this.inventoryService.getInventory().subscribe(data => {
      this.inventoryData = data;
      this.processInventoryData();
    });
  }

  processInventoryData() {
    // Process inventory data and prepare data for chart
    // For example, count items in different categories

    // Example code (count items in each category)
    const categoriesMap = new Map<string, number>();

    this.inventoryData.forEach(item => {
      const category = item.category;
      if (categoriesMap.has(category)) {
        categoriesMap.set(category, categoriesMap.get(category)! + 1);
      } else {
        categoriesMap.set(category, 1);
      }
    });

    this.barChartLabels = Array.from(categoriesMap.keys());
    this.barChartData = [{ data: Array.from(categoriesMap.values()), label: 'Inventory Count' }];
  }

  getItemQuantityStatus(quantity: number): string {
    if (quantity <= 0) {
      return 'Empty';
    } else if (quantity <= 10) {
      return 'Low';
    } else {
      return 'Sufficient';
    }
  }
}
















// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartItem } from 'chart.js/auto';

// @Component({
//   selector: 'app-analytics',
//   templateUrl: './analytics.page.html',
//   styleUrls: ['./analytics.page.scss'],
// })
// export class AnalyticsPage implements OnInit {

//   inventoryChartCanvas: HTMLCanvasElement | null = null;
//   storeChartCanvas: HTMLCanvasElement | null = null;
//   inventoryChart: Chart | null = null;
//   storeChart: Chart | null = null;

//   constructor() { }

//   ngOnInit() {
//     // Retrieve canvas elements
//     this.inventoryChartCanvas = <HTMLCanvasElement>document.getElementById('inventoryChartCanvas');
//     this.storeChartCanvas = <HTMLCanvasElement>document.getElementById('storeChartCanvas');

//     // Create chart instances
//     if (this.inventoryChartCanvas && this.inventoryChartCanvas.getContext('2d')) {
//       const ctx = this.inventoryChartCanvas.getContext('2d')!;
//       this.inventoryChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//           datasets: [{
//             label: 'Inventory Data',
//             data: [65, 59, 80, 81, 56, 55, 40],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }

//     if (this.storeChartCanvas && this.storeChartCanvas.getContext('2d')) {
//       const ctx = this.storeChartCanvas.getContext('2d')!;
//       this.storeChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//           datasets: [{
//             label: 'Store Data',
//             data: [45, 29, 60, 71, 46, 45, 30],
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }
//   }

// }
