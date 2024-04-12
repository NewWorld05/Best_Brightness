import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryMinusPage } from './inventory-minus.page';

describe('InventoryMinusPage', () => {
  let component: InventoryMinusPage;
  let fixture: ComponentFixture<InventoryMinusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMinusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
