import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IncomeSummaryService} from '../Services/income-summary.service';

@Component({
    selector: 'app-income-summary',
    templateUrl: './income-summary.component.html',
    styleUrls: ['./income-summary.component.scss']
})
export class IncomeSummaryComponent implements OnInit {
    form: FormGroup;

    constructor(private incomeSummaryService: IncomeSummaryService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            dateFromDatePicker: new FormControl(''),
            dateToDatePicker: new FormControl(''),
        })
    }

    searchIncomeSummary() {
        const startDate = new Date(this.form.controls['dateFromDatePicker'].value);
        const endDate = new Date(this.form.controls['dateToDatePicker'].value);

        this.searchBlotterSummaryWithInstrumentId(1, startDate, endDate);
        this.searchBlotterSummaryWithInstrumentId(2, startDate, endDate);
    }

    searchBlotterSummaryWithInstrumentId(instrumentTypeId: number, startDate: Date, endDate: Date) {

        this.incomeSummaryService.searchIncomeSummary(instrumentTypeId, startDate, endDate).subscribe(response => {



            const js = JSON.stringify(response);
            const obj = JSON.parse(js);

            console.log(obj);

            console.log(obj[0].purchase);
            console.log(obj[0].sales);
            console.log(obj[0].purchase.trades);
            console.log(obj[0].sales.trades);
            console.log(obj[0].faceValueSum);
            console.log(obj[0].lcyAmountSum);
            console.log(obj[0].priceTotal);
            console.log(obj[0].avgFaceValue);
            console.log(obj[0].tradeCount);
            console.log(obj[0].balanceWithinPeriod);


            if (instrumentTypeId === 1) {

            } else if (instrumentTypeId === 2) {

            }

        })

    }


}

