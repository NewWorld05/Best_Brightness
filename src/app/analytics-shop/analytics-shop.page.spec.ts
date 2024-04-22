import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsShopPage } from './analytics-shop.page';

describe('AnalyticsShopPage', () => {
  let component: AnalyticsShopPage;
  let fixture: ComponentFixture<AnalyticsShopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
