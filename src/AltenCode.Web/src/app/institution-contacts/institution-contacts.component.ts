import { Component, OnInit } from '@angular/core';
import {Institution} from '../institutions/institution.model';
import {InstitutionService} from '../Services/institution.service';
import {Router} from '@angular/router';
import {LoggingService} from '../Services/logging.service';
import {InstitutionContactService} from '../Services/institution-contact.service';
import {InstitutionContact} from '../models/institution.contact.model';

@Component({
  selector: 'app-institution-contacts',
  templateUrl: './institution-contacts.component.html',
  styleUrls: ['./institution-contacts.component.scss']
})
export class InstitutionContactsComponent implements OnInit {

  institutionContacts: InstitutionContact[] = [];

  constructor(private institutionContactService: InstitutionContactService, private router: Router, private logger: LoggingService) {
  }

  ngOnInit() {
    this.getInstitutionContacts();
  }

  getInstitutionContacts() {
    this.institutionContactService.getInstitutionContacts().subscribe(response => {
      this.institutionContacts = response;
      console.log(response);
    }, error => {
      this.logger.logError(error);
    })
  }

  createInstitutionContact() {
    this.router.navigate(['create-institution-contact']);
  }

}
