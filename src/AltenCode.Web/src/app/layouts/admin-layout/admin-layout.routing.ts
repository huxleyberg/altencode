import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {TradeComponent} from '../../trades/trade.component';
import {InstrumentsComponent} from '../../instruments/instruments.component';
import {BanksComponent} from '../../banks/banks.component';
import {InstitutionsComponent} from '../../institutions/institutions.component';
import {CreateTradeComponent} from '../../trades/create-trade/create-trade.component';
import {CreateBankComponent} from '../../banks/create-bank/create-bank.component';
import {CreateInstitutionComponent} from '../../institutions/create-institution/create-institution.component';
import {CreateInstrumentComponent} from '../../instruments/create-instrument/create-instrument.component';
import {BlotterComponent} from '../../blotter/blotter.component';
import {IncomeSummaryComponent} from '../../income-summary/income-summary.component';
import {LoginComponent} from '../../login/login.component';
import {EditTradeComponent} from '../../trades/edit-trade/edit-trade.component';
import {CreateUserProfileComponent} from '../../user-profile/create-user-profile/create-user-profile.component';
import {AuthGuard} from '../../../_guards/auth.guard';
import {CreateInstitutionContactComponent} from '../../institution-contacts/create-institution-contact/create-institution-contact.component';
import {InstitutionContactsComponent} from '../../institution-contacts/institution-contacts.component';

export const AdminLayoutRoutes: Routes = [
//     {
//       path: '',
//       children: [ {
//         path: 'dashboard',
//         component: DashboardComponent
//     }]}, {
//     path: '',
//     children: [ {
//       path: 'userprofile',
//       component: UserProfileComponent
//     }]
//     }, {
//       path: '',
//       children: [ {
//         path: 'icons',
//         component: IconsComponent
//         }]
//     }, {
//         path: '',
//         children: [ {
//             path: 'notifications',
//             component: NotificationsComponent
//         }]
//     }, {
//         path: '',
//         children: [ {
//             path: 'maps',
//             component: MapsComponent
//         }]
//     }, {
//         path: '',
//         children: [ {
//             path: 'typography',
//             component: TypographyComponent
//         }]
//     }, {
//         path: '',
//         children: [ {
//             path: 'upgrade',
//             component: UpgradeComponent
//         }]
//     }
// ,
//


    {path: 'dashboard', component: DashboardComponent},

    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},

    {path: 'trades', component: TradeComponent, canActivate: [AuthGuard]},
    {path: 'instruments', component: InstrumentsComponent, canActivate: [AuthGuard]},

    {path: 'banks', component: BanksComponent, canActivate: [AuthGuard]},
    {path: 'create-bank', component: CreateBankComponent, canActivate: [AuthGuard]},
    {path: 'create-bank/:id', component: CreateBankComponent, canActivate: [AuthGuard]},


    {path: 'institutions', component: InstitutionsComponent, canActivate: [AuthGuard]},

    {path: 'create-institution-contact', component: CreateInstitutionContactComponent, canActivate: [AuthGuard]},
    {path: 'create-institution-contact/:id', component: CreateInstitutionContactComponent, canActivate: [AuthGuard]},

    {path: 'institution-contacts', component: InstitutionContactsComponent, canActivate: [AuthGuard]},

    {path: 'create-institution', component: CreateInstitutionComponent, canActivate: [AuthGuard]},
    {path: 'create-institution/:id', component: CreateInstitutionComponent, canActivate: [AuthGuard]},

    {path: 'create-instrument', component: CreateInstrumentComponent, canActivate: [AuthGuard]},
    {path: 'create-instrument/:id', component: CreateInstrumentComponent, canActivate: [AuthGuard]},

    {path: 'blotter', component: BlotterComponent, canActivate: [AuthGuard]},
    {path: 'income-summary', component: IncomeSummaryComponent, canActivate: [AuthGuard]},

    {path: 'user-profile', component: UserProfileComponent},

    {path: 'create-user-profile', component: CreateUserProfileComponent},
    {path: 'create-user-profile/:id', component: CreateUserProfileComponent, data: {title: 'user profile'}},

    {path: 'create-trade', component: CreateTradeComponent},
    {path: 'create-trade/:id', component: CreateTradeComponent, data: {title: 'edit trade'}},

];
