import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsMovedToShopPageRoutingModule } from './items-moved-to-shop-routing.module';

import { ItemsMovedToShopPage } from './items-moved-to-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsMovedToShopPageRoutingModule
  ],
  declarations: [ItemsMovedToShopPage]
})
export class ItemsMovedToShopPageModule {}
