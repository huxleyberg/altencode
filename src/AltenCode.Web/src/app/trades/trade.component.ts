import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoggingService} from '../Services/logging.service';
import {TradeService} from '../Services/trade.service';
import {Trade} from './trade.model';


@Component({
    selector: 'app-trades',
    templateUrl: './trades.component.html',
    styleUrls: ['./trades.component.scss']
})
export class TradeComponent implements OnInit {

    trades: Trade[] = [];
    isLoadingResults = true;

    constructor(private router: Router, private logger: LoggingService, private tradeService: TradeService) {
    }

    ngOnInit() {
        this.getTrades();
    }

    getTrades() {
        this.tradeService.getAllTrades().subscribe(response => {
            this.trades = response;
            this.isLoadingResults = false;
        }, error => {
            this.logger.logError(error);
        })
    }

    addTrade() {
        this.router.navigate(['/create-trade'])
    }
}
