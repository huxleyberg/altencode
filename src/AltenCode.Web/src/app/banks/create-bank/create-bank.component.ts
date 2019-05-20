import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bank} from '../bank.model';
import {SettlementBankService} from '../../Services/settlement-bank.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-create-bank',
    templateUrl: './create-bank.component.html',
    styleUrls: ['./create-bank.component.scss']
})
export class CreateBankComponent implements OnInit {

    form: FormGroup;
    bankId: number;
    isLoadingResults: boolean;

    constructor(private settlementBankService: SettlementBankService, private router: Router, private _avRoute: ActivatedRoute) {
        if (this._avRoute.snapshot.params['id']) {
            this.bankId = this._avRoute.snapshot.params['id'];
        }
    }

    ngOnInit() {

        this.form = new FormGroup({
            bankName: new FormControl('', Validators.required),
            bankCode: new FormControl('', Validators.required),
            bankCharge: new FormControl('', Validators.required)

        })

        if (this.bankId > 0) {

            console.log(this.bankId);
            // this.isEditMode = true;

            this.isLoadingResults = true;
            this.settlementBankService.getBankById(this.bankId).subscribe(response => {
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
        this.form.controls['bankName'].setValue(response.name);
        this.form.controls['bankCode'].setValue(response.bankCode);
        this.form.controls['bankCharge'].setValue(response.charges);
    }

    gotoBanks() {
        this.router.navigate(['/banks'])
    }

    onSubmit() {
        const bank = new Bank();
        bank.name = this.form.controls['bankName'].value;
        bank.bankCode = this.form.controls['bankCode'].value;
        bank.charges = this.form.controls['bankCharge'].value;

        if (this.bankId > 0) {
            bank.id = this.bankId;

            console.log(bank);
            this.settlementBankService.updateSettlementBank(bank)
                .subscribe(res => {
                    this.router.navigate(['/banks'])
                });

        } else {
            console.log(bank);
            this.settlementBankService.addSettlementBank(bank)
                .subscribe(res => {
                    this.router.navigate(['/banks'])
                });
        }


    }

}
