import {Component, OnInit} from '@angular/core';
import {Institution} from './institution.model';
import {InstrumentService} from '../Services/instrument.service';
import {Router} from '@angular/router';
import {InstitutionService} from '../Services/institution.service';
import {LoggingService} from '../Services/logging.service';

@Component({
    selector: 'app-institutions',
    templateUrl: './institutions.component.html',
    styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {

    institutions: Institution[] = [];

    constructor(private institutionService: InstitutionService, private router: Router, private logger: LoggingService) {
    }

    ngOnInit() {
        this.getInstitutions();
    }

    getInstitutions() {
        this.institutionService.getInstitutions().subscribe(response => {
            this.institutions = response;
        }, error => {
            this.logger.logError(error);
        })
    }

    createInstitution() {
        this.router.navigate(['create-institution']);
    }

}
