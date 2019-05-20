import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TradingStock} from '../tradingstock.model';

@Component({
  selector: 'app-trade-stock',
  templateUrl: './trade-stock.component.html',
  styleUrls: ['./trade-stock.component.scss']
})
export class TradeStockComponent implements OnInit {

  @Output() newTradeStock = new EventEmitter<TradingStock>();

  constructor() { }

  ngOnInit() {
  }

  onAddNewAssignemt() {
    const tradestock = new TradingStock();

    this.newTradeStock.emit(tradestock);


  }

}
