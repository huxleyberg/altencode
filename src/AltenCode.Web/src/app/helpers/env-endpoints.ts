import {environment} from '../../environments/environment';


export const instrument_routes = {
    GET_ALL_INSTRUMENTS: environment.api_base + '/Instruments/GetAll',
    UPDATE_INSTRUMENT: environment.api_base + '/Instruments/UpdateAsync',
    CREATE_INSTRUMENT: environment.api_base + '/Instruments/Create',
    GET_INSTRUMENTS_BY_TYPE_ID: environment.api_base + '/Instruments/GetInstrumentsByTypeId',
    GET_INSTRUMENT_BY_ID: environment.api_base + '/Instruments/GetInstrumentId'
}

export const institution_routes = {
    GET_ALL_INSTITUTIONS: environment.api_base + '/Institutions/GetAll',
    GET_INSTITUTION_BY_ID: environment.api_base + '/Institutions/GetInstrumentId',
    CREATE_INSTITUTION: environment.api_base + '/Institutions/Create',
    UPDATE_INSTITUTION: environment.api_base + '/Institutions/UpdateInstitution'
}

export const institution_contact_routes = {
    GET_ALL_INSTITUTION_CONTACTS: environment.api_base + '/InstitutionContacts/GetAll',
    GET_INSTITUTION_CONTACT_BY_ID: environment.api_base + '/InstitutionContacts/GetInstitutionContactById',
    CREATE_INSTITUTION_CONTACT: environment.api_base + '/InstitutionContacts/Create',
    UPDATE_INSTITUTION_CONTACT: environment.api_base + '/InstitutionContacts/UpdateInstitution'
}

export const treasuryBills_calculations_routes = {
    CALCULATE_PURCHASE_CONSIDERATION: environment.api_base + '/TreasuryBillCalculations/ComputePurchaseConsideration',
    CALCULATE_SALES_CONSIDERATION: environment.api_base + '/TreasuryBillCalculations/ComputeSalesConsideration'
}

export const bonds_calculations_routes = {
    COMPUTE_BOND: environment.api_base + '/BondCalculations/ComputeBond'
}


export const trade_routes = {
    POST_TRADE: environment.api_base + '/Trades',
    GET_ALL_TRADES: environment.api_base + '/Trades/GetAllTrades',
    UPDATE_TRADE: environment.api_base + '/Trades/UpdateTrade',
    GET_TRADE_BY_TRADE_ID: environment.api_base + '/Trades/FetchTradeById',
}

export const blotter_routes = {
    BLOTTER_TRADE_REPORTS: environment.api_base + '/Blotter/TradeReports',
    BLOTTER_SUMMARY: environment.api_base + '/Blotter/BlotterSummary',
    SEARCH_BLOTTER_SUMMARY: environment.api_base + '/Blotter/SearchBlotterSummary'
}


export const income_summary_routes = {
    INCOME_SUMMARY: environment.api_base + '/IncomeSummaries/IncomeSummaryReports',
}

export const account_routes = {
    UPDATE_PROFILE: environment.ACCOUNT_API + '/accounts/UpdateProfile',
    GET_ALL_PROFILES: environment.ACCOUNT_API + '/accounts/GetUsers',
    GET_PROFILE_BY_ID: environment.ACCOUNT_API + '/accounts/GetUserById',
    LOGIN: environment.ACCOUNT_API + '/accounts/login',
    REGISTER: environment.ACCOUNT_API + '/accounts/register',
    ROLES: environment.ACCOUNT_API + '/Roles/GetRoles',
}

