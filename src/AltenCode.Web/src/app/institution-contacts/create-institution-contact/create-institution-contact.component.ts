import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InstitutionService} from '../../Services/institution.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InstitutionContactService} from '../../Services/institution-contact.service';
import {Institution} from '../../institutions/institution.model';
import {InstitutionContact} from '../../models/institution.contact.model';
import {Instrument} from '../../instruments/instrument.model';

@Component({
    selector: 'app-create-institution-contact',
    templateUrl: './create-institution-contact.component.html',
    styleUrls: ['./create-institution-contact.component.scss']
})
export class CreateInstitutionContactComponent implements OnInit {

    form: FormGroup;
    isLoadingResults: boolean;
    institutionContactId: number;
    institutions: Institution[] = [];


    constructor(private institutionContactService: InstitutionContactService, private institutionService: InstitutionService, private router: Router, private _avRoute: ActivatedRoute) {
        if (this._avRoute.snapshot.params['id']) {
            this.institutionContactId = this._avRoute.snapshot.params['id'];
        }
    }

    ngOnInit() {

        this.initInstitutions();

        this.form = new FormGroup({
            fullname: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            institutionId: new FormControl('', Validators.required),

        })


        if (this.institutionContactId > 0) {

            console.log(this.institutionContactId);
            // this.isEditMode = true;

            this.isLoadingResults = true;
            this.institutionContactService.getInstitutionContactById(this.institutionContactId).subscribe(response => {
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
        this.form.controls['fullname'].setValue(response.fullname);
        this.form.controls['email'].setValue(response.email);
        this.form.controls['phoneNumber'].setValue(response.phoneNumber);
        this.form.controls['institutionId'].setValue(response.institutionId);
    }

    onSubmit() {

        console.log('onSubmit called');

        const institutionContact = new InstitutionContact();
        institutionContact.fullname = this.form.controls['fullname'].value;
        institutionContact.email = this.form.controls['email'].value;
        institutionContact.phoneNumber = this.form.controls['phoneNumber'].value;
        institutionContact.institutionId = this.form.controls['institutionId'].value;


        console.log(institutionContact);

        if (this.institutionContactId > 0) {

            institutionContact.id = this.institutionContactId;

            this.institutionContactService.updateInstitutionContact(institutionContact).subscribe(response => {
                console.log('response - ' + response);
                this.router.navigate(['/institution-contacts'])
            })

        } else {
            this.institutionContactService.createInstitutionContact(institutionContact).subscribe(response => {
                console.log('response - ' + response);
                this.router.navigate(['/institution-contacts'])
            })
        }


    }

    initInstitutions() {
        this.institutionService.getInstitutions().subscribe(response => {
            this.institutions = response;
        })
    }

    gotoInstitutionContacts() {
        this.router.navigate(['/institution-contacts'])
    }


}
