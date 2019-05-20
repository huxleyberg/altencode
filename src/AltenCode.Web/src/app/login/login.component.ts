import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoggingService} from '../Services/logging.service';
import {UserService} from '../Services/user.service';
import {AuthenticationService} from '../Services/authentication.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    error = '';

    constructor(private route: ActivatedRoute, private router: Router, private logger: LoggingService,
                private userService: UserService, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        })

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

// {
//   "userName": "string",
//   "password": "string"
// }

    onSubmit() {

        const user = {
            userName: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        console.log(user);

        this.userService.userLogin(user).subscribe(response => {
            console.log(response);
        })

        // this.router.navigate(['/dashboard'])
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    login() {
        this.submitted = true;

        // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //     return;
        // }
        this.loading = true;
        const user = {
            userName: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }


        this.authenticationService.login(user)
            .pipe(first())
            .subscribe(
                data => {
                    if (data) {
                        this.router.navigate(['/dashboard'])
                    } else {
                        this.error = 'user profile not found';

                    }
                    this.loading = false;
                    // this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
