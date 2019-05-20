import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatToolbarModule, MatCardModule, MatDialogModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatTableModule,
} from '@angular/material';
import {TradeComponent} from '../../trades/trade.component';
import {InstrumentsComponent} from '../../instruments/instruments.component';
import {BanksComponent} from '../../banks/banks.component';
import {InstitutionsComponent} from '../../institutions/institutions.component';
import {CreateTradeComponent} from '../../trades/create-trade/create-trade.component';
import {HttpClientModule} from '@angular/common/http';
import {CreateBankComponent} from '../../banks/create-bank/create-bank.component';
import {FieldErrorComponent} from '../../field-error/field-error.component';
import {CreateInstitutionComponent} from '../../institutions/create-institution/create-institution.component';
import {CreateInstrumentComponent} from '../../instruments/create-instrument/create-instrument.component';
import {BlotterComponent} from '../../blotter/blotter.component';
import {IncomeSummaryComponent} from '../../income-summary/income-summary.component';
import {LoginComponent} from '../../login/login.component';
import {EditTradeComponent} from '../../trades/edit-trade/edit-trade.component';
import {CreateUserProfileComponent} from '../../user-profile/create-user-profile/create-user-profile.component';
import {InstitutionContactsComponent} from '../../institution-contacts/institution-contacts.component';
import {CreateInstitutionContactComponent} from '../../institution-contacts/create-institution-contact/create-institution-contact.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        HttpClientModule,

        MatToolbarModule, 
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        TradeComponent,
        InstrumentsComponent,
        BanksComponent,
        InstitutionsComponent,
        CreateTradeComponent,
        EditTradeComponent,
        CreateBankComponent,
        FieldErrorComponent,
        CreateInstitutionComponent,
        CreateInstrumentComponent,
        BlotterComponent,
        IncomeSummaryComponent,
        CreateUserProfileComponent,
        InstitutionContactsComponent,
        CreateInstitutionContactComponent,


    ]
})

export class AdminLayoutModule {
}
