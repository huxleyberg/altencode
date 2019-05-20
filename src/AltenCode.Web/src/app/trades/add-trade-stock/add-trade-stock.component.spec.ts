import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTradeStockComponent } from './add-trade-stock.component';

describe('AddTradeStockComponent', () => {
  let component: AddTradeStockComponent;
  let fixture: ComponentFixture<AddTradeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTradeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTradeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
