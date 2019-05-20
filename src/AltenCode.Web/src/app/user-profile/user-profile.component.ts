import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoggingService} from '../Services/logging.service';
import {UserService} from '../Services/user.service';
import {RoleModel} from '../models/role.model';
import {User} from '../models/user.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    isLoadingResults: any;

    users: User[] = [];

    constructor(private router: Router, private logger: LoggingService, private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {

        this.userService.getAllUsers().subscribe(response => {

            this.users = response;

            console.log(response);
        })
    }

    createUser() {
        this.router.navigate(['/create-user-profile']);
    }
}
