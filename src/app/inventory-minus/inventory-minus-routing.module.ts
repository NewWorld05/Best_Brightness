import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryMinusPage } from './inventory-minus.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryMinusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryMinusPageRoutingModule {}
