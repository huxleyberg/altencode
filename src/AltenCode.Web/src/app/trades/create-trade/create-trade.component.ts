import {Component, OnInit} from '@angular/core';
import {Bank} from '../../banks/bank.model';
import {Instrument} from '../../instruments/instrument.model';
import {Institution} from '../../institutions/institution.model';
import {TradingStock} from '../tradingstock.model';
import {InstrumentService} from '../../Services/instrument.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InstitutionService} from '../../Services/institution.service';
import {SettlementBankService} from '../../Services/settlement-bank.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BondsCalculationDTO} from '../../dto/bondsCalculationDTO.model';
import {BondsCalculationsService} from '../../Services/bonds-calculations.service';
import {BondsCalculationOutputModel} from '../../dto/bondsCalculationOutput.model';
import {TreasuryBillCalculationDTO} from '../../dto/treasuryBillCalculationDTO.model';
import {TreasuryBillCalculationsService} from '../../Services/treasurybill-calculations.service';
import {Trade} from '../trade.model';
import {TradeService} from '../../Services/trade.service';
import * as moment from 'moment';

@Component({
    selector: 'app-create-trade',
    templateUrl: './create-trade.component.html',
    styleUrls: ['./create-trade.component.scss']
})
export class CreateTradeComponent implements OnInit {
    volume: any;
    price: any;
    securityDate: Date;
    isTradeTypeBuy = true;
    isTransactionTypeNormal = true;
    settlementBankDefinedCharge: any;
    isLoadingResults: boolean;

    title: string = 'Create';
    tradeId: number;

    bondYieldPriceselector = [{id: 'Yield to Price'}, {id: 'Price to Yield'}];
    selectedBondYieldPriceId: number;

    banks: Bank[] = [];

    instrumentTypes = [
        {
            id: 1, name: 'Treasury Bills'
        },
        {
            id: 2, name: 'Bonds'
        }
    ];

    bondCalculationTypes = [
        {
            id: 1, name: 'Price'
        },
        {
            id: 2, name: 'Yield'
        }
    ];

    instruments: Instrument[] = [];

    institutions: Institution[] = [];


    tradeType = [{name: 'BUY'}, {name: 'SELL'}];

    transactionTypes = [{name: 'Normal'}];

    // transactionTypes = [{name: 'Normal'}, {name: 'Line'}];

    tradingstocks: TradingStock[] = [
        {
            id: 1,
            amount: '10000000000',
            name: 'NIGTB 12 SEPT 2019',
            remainingUnits: '1200000000',
            tradeId: 1,
            volume: 500000000,
            displayname: 'NIGTB 12 SEPT 2019 (1200000000 in stock)',
            fundingCost: '',
            bankCharges: '',
            securityDate: new Date(2020, 1, 1)
        },

        {
            id: 2,
            amount: '10000000000',
            name: 'NIGTB 12 SEPT 2019',
            remainingUnits: '1200000000',
            tradeId: 1,
            volume: 500000000,
            displayname: 'NIGTB 12 SEPT 2019 (1200000000 in stock)',
            fundingCost: '',
            bankCharges: '',
            securityDate: new Date(2020, 1, 1)
        },

        {
            id: 3,
            amount: '10000000000',
            name: 'NIGTB 12 SEPT 2019',
            remainingUnits: '1200000000',
            tradeId: 1,
            volume: 500000000,
            displayname: 'NIGTB 12 SEPT 2019 (1200000000 in stock)',
            fundingCost: '',
            bankCharges: '',
            securityDate: new Date(2020, 1, 1)
        },

        {
            id: 4,
            amount: '1000000000',
            name: 'NIGTB 12 SEPT 2019',
            remainingUnits: '1200000000',
            tradeId: 1,
            volume: 500000000,
            displayname: 'NIGTB 12 SEPT 2019 (1200000000 in stock)',
            fundingCost: '',
            bankCharges: '',
            securityDate: new Date(2020, 1, 1)
        },

        {
            id: 5,
            amount: '20000000000',
            name: 'NIGTB 12 SEPT 2019',
            remainingUnits: '1200000000',
            tradeId: 1,
            volume: 500000000,
            displayname: 'NIGTB 12 SEPT 2019 (1200000000 in stock)',
            fundingCost: '',
            bankCharges: '',
            securityDate: new Date(2020, 1, 1)
        }
    ];

    calculatedBankCharges: number;

    selectedTradingStocks: TradingStock[] = [];

    tradeStockToggle = false;
    SelectedDisplayName: string;
    purchaseDate: Date;
    settlementDate: Date;
    SelectedTradeType: any;
    SelectedTransactionType: any;
    SelectedTradeStockId: any;
    tradeStockVolume: any;
    fundingCost: number;
    totalCharges: number;
    addInstrumentOfTradeIsVisible = false;

    form: FormGroup;
    isBonds: boolean;
    isTreasuryBills: boolean;
    isBondPriceSelected: boolean;
    isBondYieldSelcted: boolean;
    selectedInstrumentTypeId: any;

    instrumentSelected: Instrument;

    bondsCalculationOutputModel: BondsCalculationOutputModel = new BondsCalculationOutputModel();
    consideration: any;
    isBankChargesReadOnly = true;

    setInstrumentSelected() {

    }

    toggleBankChargeField() {
        this.isBankChargesReadOnly = !this.isBankChargesReadOnly;
    }

    checkInstrumentSelected() {
        const instrumentTypeId = this.form.controls['instrumentTypeId'].value;
        this.instrumentService.getInstrumentsByTypeId(instrumentTypeId).subscribe(response => {
            console.log(response);
            this.instruments = response;

        });

        if (this.form.controls['instrumentTypeId'].value === 1) {
            this.isBonds = false;
            this.isTreasuryBills = true;
            this.selectedInstrumentTypeId = 1;
        } else {
            this.isBonds = true;
            this.isTreasuryBills = false;
            this.selectedInstrumentTypeId = 2;
        }
    }

    checkPriceOrYieldSelected() {
        if (this.form.controls['priceOrYieldSelected'].value === 1) {
            this.isBondPriceSelected = true;
            this.isBondYieldSelcted = false;
            this.form.controls['bondYield'].setValue('');
        } else {
            this.isBondPriceSelected = false;
            this.isBondYieldSelcted = true;
            this.form.controls['bondPrice'].setValue('');
        }
    }


    showTradingStock() {
        this.tradeStockToggle = true;
    }

    hideTradingStock() {
        this.tradeStockToggle = false;
        this.SelectedTradeStockId = '';
        this.tradeStockVolume = '';
        this.fundingCost = 0;
        this.SelectedDisplayName = '';

    }

    constructor(private instrumentService: InstrumentService, private tradeService: TradeService,
                private treasuryBillCalculationService: TreasuryBillCalculationsService,
                private bondCalculationService: BondsCalculationsService,
                private router: Router, private _avRoute: ActivatedRoute,
                private institutionService: InstitutionService,
                private settlementBankService: SettlementBankService) {

        if (this._avRoute.snapshot.params['id']) {
            this.tradeId = this._avRoute.snapshot.params['id'];
        }
    }

    ngOnInit() {
        // setup the dropdowns
        this.initInstitutions();
        this.initSettlementBanks();
        this.initInstruments();


        this.isBonds = false;
        this.isTreasuryBills = false;

        // SelectedTransactionType: new FormControl(''),

        this.form = new FormGroup({
            instrumentTypeId: new FormControl(''),
            tradeType: new FormControl(''),
            transactionType: new FormControl(''),
            instrumentId: new FormControl(''),
            institutionId: new FormControl(''),
            volume: new FormControl(''),
            discountRate: new FormControl(''),
            priceOrYieldSelected: new FormControl(''),
            bondPrice: new FormControl(''),
            bondYield: new FormControl(''),
            settlementBankId: new FormControl(''),
            totalBankCharges: new FormControl(''),
            totalFundingCostCharges: new FormControl(''),
            tBillsYearCountSelected: new FormControl(''),
            purchaseDate: new FormControl(''),
            settlementDate: new FormControl(''),
            tradeDate: new FormControl(''),
            lineTradeSelected: new FormControl(''),
            lineTradeVolume: new FormControl(''),
            lineFundingCost: new FormControl('')


        })

        if (this.tradeId > 0) {
            this.title = 'Edit';
            this.isLoadingResults = true;
            this.tradeService.getTradeById(this.tradeId).subscribe(response => {
                console.log(response);
                // this.form.setValue(response);
                this.setFormValues(response);
                this.isLoadingResults = false;
            }, error => {
                console.log(error);
            })


        }
    }

    setFormValues(response) {
        this.form.controls['instrumentTypeId'].setValue(response.instrumentTypeId);
        this.form.controls['tradeType'].setValue(response.tradeType);
        this.form.controls['transactionType'].setValue(response.transactionType);
        this.form.controls['instrumentId'].setValue(response.instrumentId);
        this.form.controls['institutionId'].setValue(response.institutionId);

        this.form.controls['volume'].setValue(response.volume);
        this.form.controls['discountRate'].setValue(response.discountRate);

        this.form.controls['bondPrice'].setValue(response.price);
        this.form.controls['bondYield'].setValue(response.desiredYield);

        this.form.controls['settlementBankId'].setValue(response.settlementBankId);
        this.form.controls['totalBankCharges'].setValue(response.totalBankCharges);
        this.form.controls['totalFundingCostCharges'].setValue(response.totalFundingCostCharges);
        this.form.controls['purchaseDate'].setValue(response.purchaseDate);
        this.form.controls['settlementDate'].setValue(response.settlementDate);
        this.form.controls['tradeDate'].setValue(response.tradeDate);

        this.checkInstrumentSelected();

        if (this.form.controls['bondPrice'].value === 0) {
            this.form.controls['priceOrYieldSelected'].setValue(2);
        } else if (this.form.controls['bondYield'].value === 0) {
            this.form.controls['priceOrYieldSelected'].setValue(1);
        }

        this.checkPriceOrYieldSelected();

        this.settlementBankChanged();
    }

    initSettlementBanks() {
        this.settlementBankService.getSettlementBanks().subscribe(response => {
            this.banks = response;

            console.log('banks');
            console.log(this.banks);


        })


    }

    fetchBank(id): Bank {
        const result = this.banks.find(item => item.id === id);
        return result;
    }

    fetchInstrument(id): Instrument {
        const result = this.instruments.find(item => item.id === id);
        return result;
    }

    initInstitutions() {
        this.institutionService.getInstitutions().subscribe(response => {
            this.institutions = response;
        })
    }

    initInstruments() {
        this.instrumentService.getInstruments().subscribe(response => {
            this.instruments = response;
        })
    }

    computeBonds(bondsDTO: BondsCalculationDTO) {
        this.bondCalculationService.calculateBond(bondsDTO).subscribe(response => {
            console.log(response);
        })
    }

    onTradeFormSubmit() {

        // double check, call this method here

        this.calculateTradeEarnings();

        const selectedInstrumentTypeId = this.form.controls['instrumentTypeId'].value;
        const settlementBank = this.fetchBank(this.form.controls['settlementBankId'].value);
        // this.instrumentSelected = this.form.controls['instrument'].value;

        const trade = new Trade();

        trade.accuredInterest = 0;
        trade.bondPrice = 0;
        trade.couponFrequency = 0;
        trade.dayCountBasis = 0;
        trade.dirtyPrice = 0;
        trade.desiredYield = 0;
        trade.modifiedDuration = 0;
        trade.norminalAmount = 0;

        trade.consideration = 0;
        trade.discountRate = 0;

        // instrument.maturityDate = new Date(moment(this.form.controls['maturity'].value).format('YYYY-MM-DD'));

        trade.charges = this.settlementBankDefinedCharge;
        trade.calculatedBankCharges = this.form.controls['totalBankCharges'].value;

        trade.institutionId = this.form.controls['institutionId'].value;
        trade.instrumentId = this.form.controls['instrumentId'].value; // this.instrumentSelected.id;
        trade.maturityDate = new Date(moment(this.instrumentSelected.maturityDate).format('YYYY-MM-DD')); // this.instrumentSelected.maturityDate;


        trade.settlementBankId = settlementBank.id;

        trade.purchaseDate = new Date(moment(this.form.controls['purchaseDate'].value).format('YYYY-MM-DD')); // this.form.controls['purchaseDate'].value;
        trade.settlementDate = new Date(moment(this.form.controls['settlementDate'].value).format('YYYY-MM-DD')); // this.form.controls['settlementDate'].value;
        trade.tradeDate = new Date(moment(this.form.controls['tradeDate'].value).format('YYYY-MM-DD')); // this.form.controls['tradeDate'].value;

        trade.tradeType = this.form.controls['tradeType'].value;
        trade.transactionType = this.form.controls['transactionType'].value;
        trade.volume = this.form.controls['volume'].value;
        trade.norminalAmount = this.form.controls['volume'].value;

        if (selectedInstrumentTypeId === 1) {
            // treasury
            trade.Price = this.form.controls['discountRate'].value;
            trade.discountRate = this.form.controls['discountRate'].value;
            trade.consideration = this.consideration;
        } else {
            // bonds
            trade.Price = this.form.controls['bondPrice'].value === '' ? 0 : this.form.controls['bondPrice'].value;
            trade.accuredInterest = this.bondsCalculationOutputModel.accuredInterest;
            trade.bondPrice = this.bondsCalculationOutputModel.price;
            trade.couponFrequency = this.instrumentSelected.couponFrequency;
            trade.dayCountBasis = this.instrumentSelected.dayCountBasis;
            trade.dirtyPrice = this.bondsCalculationOutputModel.dirtyPrice;
            trade.desiredYield = this.bondsCalculationOutputModel.yield;
            trade.modifiedDuration = this.bondsCalculationOutputModel.modifiedDuration;
            trade.norminalAmount = this.form.controls['volume'].value;
            trade.volume = this.form.controls['volume'].value;
            trade.consideration = this.bondsCalculationOutputModel.purchaseConsideration;

        }

        console.log('trade object');
        console.log(trade);

        if (this.tradeId > 0) {
            // edit

            this.tradeService.updateTrade(this.tradeId, trade)
                .subscribe(response => {

                    console.log('response - ' + response);

                    this.router.navigate(['/trades'])
                })
        } else {

            // create

            this.tradeService.createTrade(trade)
                .subscribe(response => {

                    console.log('response - ' + response);

                    this.router.navigate(['/trades'])
                })

        }


    }

    calculateTotalCharge() {

        let total = 0;

        for (const trading of this.selectedTradingStocks) {

            console.log(trading.fundingCost);

            total += Number(trading.fundingCost);

            console.log(total);
        }

        this.totalCharges = total;

    }

    addTradeStock() {
        const tradestock = new TradingStock();
        tradestock.tradeId = this.SelectedTradeStockId;
        tradestock.volume = this.tradeStockVolume;
        tradestock.fundingCost = this.fundingCost.toString();
        tradestock.displayname = this.SelectedDisplayName;

        this.selectedTradingStocks.push(tradestock);

        this.hideTradingStock();

        this.calculateTotalCharge();

    }

    removeSelectedTradingStock(tradingstock: TradingStock) {

        console.log(tradingstock);
        console.log(this.selectedTradingStocks.length);

        this.selectedTradingStocks.splice(this.selectedTradingStocks.indexOf(tradingstock), 1);

        console.log(this.selectedTradingStocks.length);

        this.calculateTotalCharge();

    }


    diffInDays(security: Date, valueDate: Date): number {
        const diff = Math.abs(security.getTime() - valueDate.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays;
    }

    calculateTradeEarnings() {

        const tradeType = this.form.controls['tradeType'].value;
        const selectedInstrumentTypeId = this.form.controls['instrumentTypeId'].value;

        this.instrumentSelected = this.fetchInstrument(this.form.controls['instrumentId'].value);

        console.log(this.instrumentSelected);

        if (selectedInstrumentTypeId === 1) {
            // treasury bills
            const treasuryBillDTO = new TreasuryBillCalculationDTO();
            treasuryBillDTO.charges = this.settlementBankDefinedCharge.toString();
            // treasuryBillDTO.charges = this.form.controls['totalBankCharges'].value;
            treasuryBillDTO.maturityDate = new Date(moment(this.instrumentSelected.maturityDate).format('YYYY-MM-DD')); // this.instrumentSelected.maturityDate;
            treasuryBillDTO.price = this.form.controls['discountRate'].value;
            treasuryBillDTO.purchaseDate = new Date(moment(this.form.controls['purchaseDate'].value).format('YYYY-MM-DD')); // this.form.controls['purchaseDate'].value;
            treasuryBillDTO.settlementDate = new Date(moment(this.form.controls['settlementDate'].value).format('YYYY-MM-DD')); // this.form.controls['settlementDate'].value;
            treasuryBillDTO.volume = this.form.controls['volume'].value;

            console.log('treasuryBillDTO');
            console.log(treasuryBillDTO);


            if (tradeType === 'BUY') {
                this.treasuryBillCalculationService.calculatePurchaseConsideration(treasuryBillDTO).subscribe(response => {
                    console.log(response);
                    this.consideration = response.consideration;
                    this.calculatedBankCharges = response.calculatedBankCharges;
                    this.form.controls['totalBankCharges'].setValue(this.calculatedBankCharges)

                });
            } else {
                this.treasuryBillCalculationService.calculateSalesConsideration(treasuryBillDTO).subscribe(response => {
                    console.log(response);
                    this.consideration = response.consideration;
                    this.calculatedBankCharges = response.calculatedBankCharges;
                    this.form.controls['totalBankCharges'].setValue(this.calculatedBankCharges)
                });
            }


        } else {
            // bonds
            const bondsDTO = new BondsCalculationDTO();

            bondsDTO.charges = this.settlementBankDefinedCharge;
            bondsDTO.couponRate = this.instrumentSelected.couponRate;
            bondsDTO.couponFrequency = this.instrumentSelected.couponFrequency;
            bondsDTO.dayCountBasis = this.instrumentSelected.dayCountBasis;
            bondsDTO.maturityDate = new Date(moment(this.instrumentSelected.maturityDate).format('YYYY-MM-DD')); // this.instrumentSelected.maturityDate;
            bondsDTO.parValue = this.instrumentSelected.parValue;
            bondsDTO.price = this.form.controls['bondPrice'].value;
            bondsDTO.volume = this.form.controls['volume'].value;
            bondsDTO.yield = this.form.controls['bondYield'].value;
            bondsDTO.settlementDate = new Date(moment(this.form.controls['settlementDate'].value).format('YYYY-MM-DD')); // this.form.controls['settlementDate'].value;

            console.log('bondsDTO');
            console.log(bondsDTO);

            this.bondCalculationService.calculateBond(bondsDTO).subscribe(response => {
                this.bondsCalculationOutputModel = response;
                this.calculatedBankCharges = response.calculatedBankCharges;
                this.form.controls['totalBankCharges'].setValue(this.calculatedBankCharges)
                console.log(response);
            })
        }
    }


    toggleLineBuyAndSell() {

        const tradeType = this.form.controls['tradeType'].value;
        const transactionType = this.form.controls['transactionType'].value;
        if (tradeType === 'SELL') {
            this.addInstrumentOfTradeIsVisible = true;
            this.isTradeTypeBuy = false;
        } else {
            this.addInstrumentOfTradeIsVisible = false;
            this.isTradeTypeBuy = true;
        }

        if (transactionType === 'Line') {
            this.addInstrumentOfTradeIsVisible = true;
        } else {
            this.addInstrumentOfTradeIsVisible = false;
        }

        if (tradeType === 'BUY') {
            this.addInstrumentOfTradeIsVisible = false;

        }
    }

    settlementBankChanged() {
        const id = this.form.controls['settlementBankId'].value;
        const bank = this.fetchBank(id);
        this.settlementBankDefinedCharge = bank.charges;
        // this.form.controls['totalBankCharges'].setValue(bank.charges)
        // console.log(bank)
        // console.log('name : ' + bank.name);
        // console.log('charges : ' + bank.charges);
    }

    displayTrades() {
        this.router.navigate(['/trades'])
    }

    commaFormatted(event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) {
            return;
        }

        // format number
        let volume = this.form.controls['volume'].value;
        if (volume) {
            volume = volume.replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            this.form.controls['volume'].setValue(volume)
        }
    }

    numberCheck(args) {
        if (args.key === 'e' || args.key === '+' || args.key === '-') {
            return false;
        } else {
            return true;
        }
    }


}
