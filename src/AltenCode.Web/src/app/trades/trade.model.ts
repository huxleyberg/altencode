export class Trade {
    id: number;
    tradeType: string;
    transactionType: string;
    instrumentId: number;
    institutionId: number;
    institutionName: string;
    settlementBankId: number;
    settlementBankName: string;
    purchaseDate: Date;
    settlementDate: Date;
    charges: any;
    Price: number;
    volume: number;
    consideration: number;
    tradeDate: Date;
    discountRate: number;
    norminalAmount: number;
    bondPrice: number;
    desiredYield: number;
    accuredInterest: number;
    dirtyPrice: number;
    modifiedDuration: number;
    maturityDate: Date;
    couponFrequency: number;
    dayCountBasis: number;
    tradeTransactionId: string;
    calculatedBankCharges: number;
    tradeReferenceId: string;

}

