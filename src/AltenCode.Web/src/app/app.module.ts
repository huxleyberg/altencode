import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
} from '@angular/material';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {
    AgmCoreModule
} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {InstrumentsComponent} from './instruments/instruments.component';
import {TradeComponent} from './trades/trade.component';
import {BanksComponent} from './banks/banks.component';
import {InstitutionsComponent} from './institutions/institutions.component';
import {TradeStockComponent} from './trades/trade-stock/trade-stock.component';
import {AddTradeStockComponent} from './trades/add-trade-stock/add-trade-stock.component';
import {CreateTradeComponent} from './trades/create-trade/create-trade.component';
import {ErrorsService} from './errors.service';
import {FieldErrorComponent} from './field-error/field-error.component';
import {CreateInstrumentComponent} from './instruments/create-instrument/create-instrument.component';
import {CreateBankComponent} from './banks/create-bank/create-bank.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CreateInstitutionComponent} from './institutions/create-institution/create-institution.component';
import {BlotterComponent} from './blotter/blotter.component';
import {IncomeSummaryComponent} from './income-summary/income-summary.component';
import {LoginComponent} from './login/login.component';
import {InstitutionContactsComponent} from './institution-contacts/institution-contacts.component';
import {CreateInstitutionContactComponent} from './institution-contacts/create-institution-contact/create-institution-contact.component';
import {EditTradeComponent} from './trades/edit-trade/edit-trade.component';
import {CreateUserProfileComponent} from './user-profile/create-user-profile/create-user-profile.component';
import {JwtInterceptor} from '../_helpers/jwt.interceptor';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,

        MatToolbarModule,

        MatButtonModule,

        MatCardModule,

        MatInputModule,

        MatDialogModule,

        MatTableModule,

        MatMenuModule,

        MatIconModule,

        MatProgressSpinnerModule,


        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        TradeStockComponent,
        AddTradeStockComponent,
        LoginComponent,


    ],
    providers: [
        {provide: ErrorHandler, useClass: ErrorsService},
        // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        ],
        bootstrap: [AppComponent]
})
export class AppModule {
}
