import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsMovedToShopPage } from './items-moved-to-shop.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsMovedToShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsMovedToShopPageRoutingModule {}
