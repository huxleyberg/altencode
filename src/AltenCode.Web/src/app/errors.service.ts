import {Injectable, ErrorHandler} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService implements ErrorHandler {

    constructor() {
    }

    handleError(error: any) {
        console.error(error)

        if (error instanceof HttpErrorResponse) {
            console.log('Server error: ' + error.message)
        } else {
            console.log('Other error: ' + error.message)
        }

    }
}

