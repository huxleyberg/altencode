import {Component, OnInit} from '@angular/core';
import {Institution} from '../institutions/institution.model';
import {InstitutionService} from '../Services/institution.service';
import {Router} from '@angular/router';
import {LoggingService} from '../Services/logging.service';
import {Trade} from 'app/trades/trade.model';
import {BlotterService} from '../Services/blotter.service';
import {BlotterRequestDtoModel} from '../dto/blotter-request-dto-model';
import {InstrumentService} from '../Services/instrument.service';
import {Instrument} from '../instruments/instrument.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-blotter',
    templateUrl: './blotter.component.html',
    styleUrls: ['./blotter.component.scss']
})
export class BlotterComponent implements OnInit {

    purchasedTreasuryBills: Trade[] = [];
    purchasedBonds: Trade[] = [];
    soldBonds: Trade[] = [];
    soldTreasuryBills: Trade[] = [];

    treasuryTotalSales: number;
    treasuryTotalPurchase: number;
    treasuryNetPosition: number;
    treasuryNetCash: number;

    bondsTotalSales: number;
    bondsTotalPurchase: number;
    bondsNetPosition: number;
    bondsNetCash: number;

    instruments: Instrument[];

    // treasurybills
    tPurchaseConsideration: number;
    tSalesConsideration: number;
    tTotalCharges: number;
    tRevenue: number;

    // bonds
    bPurchaseConsideration: number;
    bSalesConsideration: number;
    bTotalCharges: number;
    bRevenue: number;

    form: FormGroup;

    constructor(private instrumentService: InstrumentService, private blotterService: BlotterService, private router: Router, private logger: LoggingService) {
    }

    ngOnInit() {

        this.form = new FormGroup({
            dateFromDatePicker: new FormControl(''),
            dateToDatePicker: new FormControl(''),
            instrument: new FormControl(''),
        })

        this.form.controls['dateFromDatePicker'].setValue(new Date())
        this.form.controls['dateToDatePicker'].setValue(new Date())

        const startDate = new Date(this.form.controls['dateFromDatePicker'].value);
        const endDate = new Date(this.form.controls['dateToDatePicker'].value);

        this.getBlotterSummary(1, startDate, endDate);

        this.getBlotterSummary(2, startDate, endDate);

        this.instrumentService.getInstrumentsByTypeId(1).subscribe(response => {
            console.log(response);
            this.instruments = response;

        });
    }

    initInstruments() {
        this.instrumentService.getInstruments().subscribe(response => {
            this.instruments = response;
        })
    }

    getBlotterSummary(instrumentTypeId: number, startDate: Date, endDate: Date) {

        this.blotterService.getBlotterSummary(instrumentTypeId, startDate, endDate).subscribe(response => {

            console.log('blotter summary' + response);

            if (instrumentTypeId === 1) {
                this.purchasedTreasuryBills = response.purchasedTrades;
                this.soldTreasuryBills = response.soldTrades;
                this.treasuryTotalSales = response.totalSales;
                this.treasuryTotalPurchase = response.totalPurchase;
                this.treasuryNetPosition = response.netPosition;
                this.treasuryNetCash = response.netCash;

                this.tPurchaseConsideration = response.totalPurchaseConsideration;
                this.tSalesConsideration = response.totalSalesConsideration;
                this.tTotalCharges = response.totalCharges;
                this.tRevenue = response.revenue;

            } else if (instrumentTypeId === 2) {
                this.purchasedBonds = response.purchasedTrades;
                this.soldBonds = response.soldTrades;
                this.bondsTotalSales = response.totalSales;
                this.bondsTotalPurchase = response.totalPurchase;
                this.bondsNetPosition = response.netPosition;
                this.bondsNetCash = response.netCash;

                this.bPurchaseConsideration = response.totalPurchaseConsideration;
                this.bSalesConsideration = response.totalSalesConsideration;
                this.bTotalCharges = response.totalCharges;
                this.bRevenue = response.revenue;
            }

        })
    }

    searchBlotterSummaryWithInstrumentId(instrumentTypeId: number, instrumentId: number, startDate: Date, endDate: Date) {

        this.blotterService.searchBlotterSummary(instrumentTypeId, instrumentId, startDate, endDate).subscribe(response => {

            console.log('search blotter summary' + response);

            if (instrumentTypeId === 1) {
                this.purchasedTreasuryBills = response.purchasedTrades;
                this.soldTreasuryBills = response.soldTrades;
                this.treasuryTotalSales = response.totalSales;
                this.treasuryTotalPurchase = response.totalPurchase;
                this.treasuryNetPosition = response.netPosition;
                this.treasuryNetCash = response.netCash;

                this.tPurchaseConsideration = response.totalPurchaseConsideration;
                this.tSalesConsideration = response.totalSalesConsideration;
                this.tTotalCharges = response.totalCharges;
                this.tRevenue = response.revenue;

            } else if (instrumentTypeId === 2) {
                this.purchasedBonds = response.purchasedTrades;
                this.soldBonds = response.soldTrades;
                this.bondsTotalSales = response.totalSales;
                this.bondsTotalPurchase = response.totalPurchase;
                this.bondsNetPosition = response.netPosition;
                this.bondsNetCash = response.netCash;

                this.bPurchaseConsideration = response.totalPurchaseConsideration;
                this.bSalesConsideration = response.totalSalesConsideration;
                this.bTotalCharges = response.totalCharges;
                this.bRevenue = response.revenue;
            }

        })
    }


    searchBlotter() {

        const startDate = new Date(this.form.controls['dateFromDatePicker'].value);
        const endDate = new Date(this.form.controls['dateToDatePicker'].value);
        const instrumentId: number = this.form.controls['instrument'].value;

        console.log(instrumentId);

        this.searchBlotterSummaryWithInstrumentId(1, instrumentId, startDate, endDate);

        this.searchBlotterSummaryWithInstrumentId(2, instrumentId, startDate, endDate);
    }

    treasuryMenuSelected() {

        console.log('treasuryMenuSelected');
        this.instrumentService.getInstrumentsByTypeId(1).subscribe(response => {
            console.log(response);
            this.instruments = response;

        });
    }

    bondsMenuselected() {

        console.log('bondsMenuSelected');
        this.instrumentService.getInstrumentsByTypeId(2).subscribe(response => {
            console.log(response);
            this.instruments = response;

        });
    }
}
