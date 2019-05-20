import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeStockComponent } from './trade-stock.component';

describe('TradeStockComponent', () => {
  let component: TradeStockComponent;
  let fixture: ComponentFixture<TradeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
