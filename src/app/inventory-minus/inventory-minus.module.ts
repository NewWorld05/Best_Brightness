import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryMinusPageRoutingModule } from './inventory-minus-routing.module';

import { InventoryMinusPage } from './inventory-minus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryMinusPageRoutingModule
  ],
  declarations: [InventoryMinusPage]
})
export class InventoryMinusPageModule {}
