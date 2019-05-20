import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {InstitutionService} from '../../Services/institution.service';
import {Instrument} from '../../instruments/instrument.model';
import {DatePipe} from '@angular/common';
import {Institution} from '../institution.model';

@Component({
    selector: 'app-create-institution',
    templateUrl: './create-institution.component.html',
    styleUrls: ['./create-institution.component.scss']
})
export class CreateInstitutionComponent implements OnInit {

    form: FormGroup;
    isLoadingResults: boolean;
    institutionId: number;

    constructor(private institutionService: InstitutionService, private router: Router, private _avRoute: ActivatedRoute) {
        if (this._avRoute.snapshot.params['id']) {
            this.institutionId = this._avRoute.snapshot.params['id'];
        }
    }


    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            institutionCode: new FormControl('', Validators.required),
            contactName: new FormControl('', Validators.required),
            contactPhoneNumber: new FormControl('', Validators.required),
            contactAddress: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            rcNumber: new FormControl('', Validators.required)
        })

        if (this.institutionId > 0) {

            console.log(this.institutionId);
            // this.isEditMode = true;

            this.isLoadingResults = true;
            this.institutionService.getInstitutionById(this.institutionId).subscribe(response => {
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
        this.form.controls['institutionCode'].setValue(response.code);
        this.form.controls['contactAddress'].setValue(response.contactAddress);
        this.form.controls['city'].setValue(response.city);
        this.form.controls['rcNumber'].setValue(response.rcNumber);
    }

    onSubmit() {

        console.log('onSubmit called');

        const institution = new Institution();
        institution.name = this.form.controls['name'].value;
        institution.code = this.form.controls['institutionCode'].value;
        institution.contactName = '';
        institution.contactPhoneNumber = '';
        // institution.contactName = this.form.controls['contactName'].value;
        // institution.contactPhoneNumber = this.form.controls['contactPhoneNumber'].value;
        institution.contactAddress = this.form.controls['contactAddress'].value;
        institution.city = this.form.controls['city'].value;
        institution.rcNumber = this.form.controls['rcNumber'].value;

        console.log(institution);

        if (this.institutionId > 0) {

            institution.id = this.institutionId;

            this.institutionService.updateInstitution(institution).subscribe(response => {
                console.log('response - ' + response);
                this.router.navigate(['/institutions'])
            })

        } else {
            this.institutionService.createInstitution(institution).subscribe(response => {
                console.log('response - ' + response);
                this.router.navigate(['/institutions'])
            })
        }


        // this.settlementBankService.addSettlementBank(bank)
        //     .subscribe(res => {
        //         this.router.navigate(['/banks'])
        //     });


    }

    gotoInstitutions() {
        this.router.navigate(['/institutions'])
    }
}
