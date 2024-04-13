import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsMovedToShopPage } from './items-moved-to-shop.page';

describe('ItemsMovedToShopPage', () => {
  let component: ItemsMovedToShopPage;
  let fixture: ComponentFixture<ItemsMovedToShopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsMovedToShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
