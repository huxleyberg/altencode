import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Trade} from '../../trades/trade.model';
import {RoleModel} from '../../models/role.model';
import {InstrumentService} from '../../Services/instrument.service';
import {TradeService} from '../../Services/trade.service';
import {TreasuryBillCalculationsService} from '../../Services/treasurybill-calculations.service';
import {BondsCalculationsService} from '../../Services/bonds-calculations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InstitutionService} from '../../Services/institution.service';
import {SettlementBankService} from '../../Services/settlement-bank.service';
import {UserService} from '../../Services/user.service';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-create-user-profile',
    templateUrl: './create-user-profile.component.html',
    styleUrls: ['./create-user-profile.component.scss']
})
export class CreateUserProfileComponent implements OnInit {

    form: FormGroup;

    roles: RoleModel[] = [];
    userId: number;
    isLoadingResults: boolean;
    isEditMode = false;


    constructor(
        private router: Router, private _avRoute: ActivatedRoute,
        private userService: UserService) {

        if (this._avRoute.snapshot.params['id']) {
            this.userId = this._avRoute.snapshot.params['id'];
        }
    }

    ngOnInit() {
        this.form = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            roles: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
        })

        this.initRoles();

        if (this.userId > 0) {

            console.log(this.userId);
            this.isEditMode = true;

            this.isLoadingResults = true;
            this.userService.getUserById(this.userId).subscribe(response => {
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
        this.form.controls['firstname'].setValue(response.firstName);
        this.form.controls['lastname'].setValue(response.lastName);
        this.form.controls['email'].setValue(response.username);
        this.form.controls['roles'].setValue(response.roles);
    }

    onSubmit() {

        const user = new User();
        user.firstname = this.form.controls['firstname'].value;
        user.lastname = this.form.controls['lastname'].value;
        user.username = this.form.controls['email'].value;
        user.roles = this.form.controls['roles'].value;

        if (this.userId > 0) {

            user.id = this.userId;

            console.log(user);

            this.userService.updateProfile(user).subscribe(response => {
                console.log(response);
                this.router.navigate(['/user-profile']);
            })
        } else {
            user.password = this.form.controls['password'].value;


            console.log(user);

            this.userService.userRegister(user).subscribe(response => {
                console.log(response);
                this.router.navigate(['/user-profile']);
            })
        }


    }

    initRoles() {
        this.userService.getRoles().subscribe(response => {

            this.roles = response;

            console.log(response);
        })
    }

    lstUsers() {
        this.router.navigate(['/user-profile']);
    }
}
