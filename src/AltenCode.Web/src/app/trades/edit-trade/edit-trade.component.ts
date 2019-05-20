import { Component, OnInit } from '@angular/core';
import {Bank} from '../../banks/bank.model';
import {Instrument} from '../../instruments/instrument.model';
import {Institution} from '../../institutions/institution.model';
import {TradingStock} from '../tradingstock.model';
import {FormControl, FormGroup} from '@angular/forms';
import {BondsCalculationOutputModel} from '../../dto/bondsCalculationOutput.model';
import {InstrumentService} from '../../Services/instrument.service';
import {TradeService} from '../../Services/trade.service';
import {TreasuryBillCalculationsService} from '../../Services/treasurybill-calculations.service';
import {BondsCalculationsService} from '../../Services/bonds-calculations.service';
import {Router} from '@angular/router';
import {InstitutionService} from '../../Services/institution.service';
import {SettlementBankService} from '../../Services/settlement-bank.service';
import {BondsCalculationDTO} from '../../dto/bondsCalculationDTO.model';
import {Trade} from '../trade.model';
import {TreasuryBillCalculationDTO} from '../../dto/treasuryBillCalculationDTO.model';

@Component({
  selector: 'app-edit-trade',
  templateUrl: './edit-trade.component.html',
  styleUrls: ['./edit-trade.component.scss']
})

export class EditTradeComponent implements OnInit {
  volume: any;
  price: any;
  securityDate: Date;
  isTradeTypeBuy = true;
  isTransactionTypeNormal = true;
  settlementBankDefinedCharge: any;

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
              private treasuryBillCalculationService: TreasuryBillCalculationsService, private bondCalculationService: BondsCalculationsService,
              private router: Router, private institutionService: InstitutionService, private settlementBankService: SettlementBankService) {
  }

  ngOnInit() {

    this.initInstitutions();
    this.initSettlementBanks();
    this.initInstruments();
    this.isBonds = false;
    this.isTreasuryBills = false;

    this.form = new FormGroup({
      instrumentTypeId: new FormControl(''),
      tradeType: new FormControl(''),
      SelectedTransactionType: new FormControl(''),
      instrument: new FormControl(''),
      institutionId: new FormControl(''),
      volume: new FormControl(''),
      discountRate: new FormControl(''),
      priceOrYieldSelected: new FormControl(''),
      bondPrice: new FormControl(''),
      bondYield: new FormControl(''),
      settlementBank: new FormControl(''),
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
  }

  initSettlementBanks() {
    this.settlementBankService.getSettlementBanks().subscribe(response => {
      this.banks = response;
    })
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
    const selectedInstrumentTypeId = this.form.controls['instrumentTypeId'].value;
    const settlementBank = this.form.controls['settlementBank'].value;
    this.instrumentSelected = this.form.controls['instrument'].value;

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


    trade.charges = this.settlementBankDefinedCharge;
    trade.calculatedBankCharges = this.form.controls['totalBankCharges'].value;

    trade.institutionId = this.form.controls['institutionId'].value;
    trade.instrumentId = this.instrumentSelected.id;
    trade.maturityDate = this.instrumentSelected.maturityDate;

    trade.purchaseDate = this.form.controls['purchaseDate'].value;
    trade.settlementBankId = settlementBank.id;
    trade.settlementDate = this.form.controls['settlementDate'].value;
    trade.tradeDate = this.form.controls['tradeDate'].value;
    trade.tradeType = this.form.controls['tradeType'].value;
    trade.transactionType = this.form.controls['SelectedTransactionType'].value;
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

    this.tradeService.createTrade(trade)
        .subscribe(response => {

          console.log('response - ' + response);

          this.router.navigate(['/trades'])
        })
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

    this.instrumentSelected = this.form.controls['instrument'].value;
    console.log(this.instrumentSelected);

    if (selectedInstrumentTypeId === 1) {
      // treasury bills
      const treasuryBillDTO = new TreasuryBillCalculationDTO();
      treasuryBillDTO.charges = this.settlementBankDefinedCharge.toString();
      // treasuryBillDTO.charges = this.form.controls['totalBankCharges'].value;
      treasuryBillDTO.maturityDate = this.instrumentSelected.maturityDate;
      treasuryBillDTO.price = this.form.controls['discountRate'].value;
      treasuryBillDTO.purchaseDate = this.form.controls['purchaseDate'].value;
      treasuryBillDTO.settlementDate = this.form.controls['settlementDate'].value;
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
      bondsDTO.maturityDate = this.instrumentSelected.maturityDate;
      bondsDTO.parValue = this.instrumentSelected.parValue;
      bondsDTO.price = this.form.controls['bondPrice'].value;
      bondsDTO.volume = this.form.controls['volume'].value;
      bondsDTO.yield = this.form.controls['bondYield'].value;
      bondsDTO.settlementDate = this.form.controls['settlementDate'].value;

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

  setTradeStockDate(id: number) {
    this.tradingstocks.forEach((trade, i) => {
      if (trade.id === id) {
        this.securityDate = trade.securityDate;
      }
    });
  }

  tradeTypeChanged() {
    if (this.SelectedTradeType === 'SELL') {
      this.addInstrumentOfTradeIsVisible = true;
      this.isTradeTypeBuy = false;
    } else {
      this.addInstrumentOfTradeIsVisible = false;
      this.isTradeTypeBuy = true;
    }
  }

  transactionTypeChanged() {
    if (this.SelectedTransactionType === 'Line') {
      this.addInstrumentOfTradeIsVisible = true;
    } else {
      this.addInstrumentOfTradeIsVisible = false;
    }
  }

  toggleLineBuyAndSell() {

    const tradeType = this.form.controls['tradeType'].value;
    const transactionType = this.form.controls['SelectedTransactionType'].value;
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
    const bank = this.form.controls['settlementBank'].value;
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
