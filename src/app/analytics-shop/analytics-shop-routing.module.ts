import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsShopPage } from './analytics-shop.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsShopPageRoutingModule {}
