import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalyticsShopPageRoutingModule } from './analytics-shop-routing.module';

import { AnalyticsShopPage } from './analytics-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalyticsShopPageRoutingModule
  ],
  declarations: [AnalyticsShopPage]
})
export class AnalyticsShopPageModule {}
