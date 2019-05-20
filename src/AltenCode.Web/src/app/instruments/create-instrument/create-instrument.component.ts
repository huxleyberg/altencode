import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bank} from '../../banks/bank.model';
import {Instrument} from '../instrument.model';
import {SettlementBankService} from '../../Services/settlement-bank.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InstrumentService} from '../../Services/instrument.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'app-create-instrument',
    templateUrl: './create-instrument.component.html',
    styleUrls: ['./create-instrument.component.scss']
})
export class CreateInstrumentComponent implements OnInit {

    form: FormGroup;
    instrumentId: number;
    isLoadingResults: boolean;

    InstrumentTypes = [{id: 1, name: 'Treasury Bills'}, {id: 2, name: 'Bonds'}]
    DayCountBasisList = [
        {value: 0, name: 'US 30/360'},
        {value: 1, name: 'Actual/actual'},
        {value: 2, name: 'Actual/360'},
        {value: 3, name: 'Actual/365'},
        {value: 4, name: 'EUR 30/360'}
    ]

    isTreasuryBill = false;

    constructor(private instrumentService: InstrumentService, private router: Router, private _avRoute: ActivatedRoute) {
        if (this._avRoute.snapshot.params['id']) {
            this.instrumentId = this._avRoute.snapshot.params['id'];
        }
    }

    ngOnInit() {

        this.form = new FormGroup({
            name: new FormControl(''),
            maturity: new FormControl(''),
            instrumentTypeId: new FormControl(''),
            perValue: new FormControl(''),
            coupon: new FormControl(''),
            couponFrequency: new FormControl(''),
            dayCountBasis: new FormControl('')
        })

        if (this.instrumentId > 0) {

            console.log(this.instrumentId);
            // this.isEditMode = true;

            this.isLoadingResults = true;
            this.instrumentService.getInstrumentById(this.instrumentId).subscribe(response => {
                console.log(response);
                // this.form.setValue(response);
                this.setFormValues(response);
                this.isLoadingResults = false;
            }, error => {
                console.log(error);
            })
        }

    }

    setFormValues(response) {
        this.form.controls['name'].setValue(response.name);
        this.form.controls['maturity'].setValue(response.maturityDate);
        this.form.controls['instrumentTypeId'].setValue(response.instrumentTypeId);
        this.form.controls['perValue'].setValue(response.parValue);
        this.form.controls['coupon'].setValue(response.couponRate);
        this.form.controls['couponFrequency'].setValue(response.couponFrequency);
        this.form.controls['dayCountBasis'].setValue(response.dayCountBasis);

        this.toggleInstrumentType();

    }

    onSubmit() {

        const instrument = new Instrument();
        instrument.name = this.form.controls['name'].value;

        const datePipe = new DatePipe('en-US');
        const dt = datePipe.transform(this.form.controls['maturity'].value, 'dd/MM/yyyy');

        // instrument.maturityDate = this.parse(dt);

        instrument.maturityDate = new Date(moment(this.form.controls['maturity'].value).format('YYYY-MM-DD')); // this.form.controls['maturity'].value;

        instrument.instrumentTypeId = this.form.controls['instrumentTypeId'].value;

        const instrumentTypeId = this.form.controls['instrumentTypeId'].value;

        if (instrumentTypeId === 1) {
            instrument.parValue = 0;
            instrument.couponRate = 0;
            instrument.couponFrequency = 0;
            instrument.dayCountBasis = 0;

        } else if (instrumentTypeId === 2) {
            instrument.parValue = this.form.controls['perValue'].value;
            instrument.couponRate = this.form.controls['coupon'].value;
            instrument.couponFrequency = this.form.controls['couponFrequency'].value;
            instrument.dayCountBasis = this.form.controls['dayCountBasis'].value;
        }

        console.log(instrument);

        if (this.instrumentId > 0) {
            instrument.id = this.instrumentId;
            this.instrumentService.updateAsyncInstrument(instrument).subscribe(response => {
                console.log('response - ' + response);

                this.router.navigate(['/instruments'])
            })
        } else {
            this.instrumentService.createInstrument(instrument).subscribe(response => {
                console.log('response - ' + response);

                this.router.navigate(['/instruments'])
            })
        }


    }

    parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            const str = value.split('/');

            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);

            return new Date(year, month, date);
        } else if ((typeof value === 'string') && value === '') {
            return new Date();
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    toggleTreasuryBill() {
        this.isTreasuryBill = false;
    }

    toggleInstrumentType() {
        const instrumentType = this.form.controls['instrumentTypeId'].value;
        console.log(instrumentType);
        // for treasurybills
        if (instrumentType === 1) {
            this.isTreasuryBill = true;
        } else {
            this.isTreasuryBill = false;
        }


    }

    gotoInstruments() {
        this.router.navigate(['/instruments'])
    }
}
