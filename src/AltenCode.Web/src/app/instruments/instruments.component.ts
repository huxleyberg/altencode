import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bank} from '../banks/bank.model';
import {Instrument} from './instrument.model';
import {InstrumentService} from '../Services/instrument.service';
import {SettlementBankService} from '../Services/settlement-bank.service';
import {Router} from '@angular/router';

class Investment {
}

@Component({
    selector: 'app-instruments',
    templateUrl: './instruments.component.html',
    styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

    form: FormGroup;
    instruments: Instrument[] = [];
    isLoadingResults: any;


    constructor(private instrumentService: InstrumentService, private router: Router) {
    }

    ngOnInit() {

        // this.form = new FormGroup({
        //   name: new FormControl('', Validators.required),
        //   maturity: new FormControl('', Validators.required),
        //   InstrumentType: new FormControl('', Validators.required),
        // })

        this.getInstruments();

    }

    getInstruments() {
        this.instrumentService.getInstruments()
            .subscribe(response => {
                console.log(response);
                this.instruments = response;
            });
    }

    createInstrument() {
        this.router.navigate(['/create-instrument']);
    }
}
