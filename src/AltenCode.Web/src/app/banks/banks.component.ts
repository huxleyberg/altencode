import {Component, OnInit} from '@angular/core';
import {Bank} from './bank.model';
import {SettlementBankService} from '../Services/settlement-bank.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {

    banks: Bank[] = [];

    constructor(private settlementBankService: SettlementBankService, private router: Router) {
    }

    ngOnInit() {
        this.getBanks();
    }

    getBanks() {
        this.settlementBankService.getSettlementBanks()
            .subscribe(bks => this.banks = bks);
    }

    createBank() {
        this.router.navigate(['/create-bank'])
    }
}
