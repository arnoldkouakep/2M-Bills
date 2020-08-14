import {Component, OnInit} from '@angular/core';
import {faEllipsisH, faHome, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {Title} from '@angular/platform-browser';
import {User} from '../../shared/models/user.model';
import {PageTitleService} from '../../shared/services/page-title.service';
import {Color, Label} from 'ng2-charts';

import {ChartDataSets, ChartOptions} from 'chart.js';
// import {SubscriptionService} from '../../shared/services/subscription.service';
// import {CollectService} from '../../shared/services/collect.service';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {AuthenticationService} from '../../shared/services/auth.service';
// import { BranchService } from '../../shared/services/branch';
// import { CardService } from '../../shared/services/card.service';
// import { ComptesService } from '../../shared/services/comptes.service';
// import { EmfServiceService } from '../../shared/services/emf-service.service';

registerLocaleData(localeFr, 'fr');

// class DataTablesResponse {
//   data: any[];
//   draw: number;
//   recordsFiltered: number;
//   recordsTotal: number;
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  users: User[];
  faHome = faHome;
  faUser = faUser;
  faLock = faLock;
  faEllipsisH = faEllipsisH;
  // requestedCard = "dash.RequestedCard";

  monthsNames = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
    'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

  // chart for subscription chart
  public cardChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Dossiers(Traités et en Attente)'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Factures(Payées et impayées)'}
  ];
  // public subscriptionsChartLabels: Label[] = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout'];
  public cardChartLabels: Label[] = [];
  public cardChartOptions: (ChartOptions & { annotation: any } | any) = {
    responsive: true,
  };

  public cardChartColors: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgba(112, 183, 80, 0.5)',
    },
    {
      borderColor: '#026fab',
      backgroundColor: 'rgb(2, 136, 209, 0.3)',
    }
  ];

  public cardChartLegend = true;
  public cardChartType = 'line';
  public cardChartPlugins = [];

  // chart for collects
  public accountChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Depenses'},
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Debours'}
  ];


  public accountChartLabels: Label[] = [];
  // public accountChartLabels: Label[] = [];
  public accountChartOptions: (ChartOptions & { annotation: any } | any) = {
    responsive: true,
  };

  public accountChartColors: Color[] = [
    {
      borderColor: '#026fab',
      backgroundColor: 'rgb(2, 136, 209, 0.3)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(112, 183, 80, 0.5)',
    },
  ];
  public accountChartLegend = true;
  public accountChartType = 'line';
  public accountChartPlugins = [];

  subTitle = 'Tableau de bord';

  // maps informations
  lat = -3.392757;
  lng = 14.84607;
  branchIcon = 'assets/images/markers/branch.png';
  atmIcon = 'assets/images/markers/atm.png';

  branchesList = [];
  branchesLength = 0;
  atmsList = [];
  atmsLength = 0;
  allCardsLength = 0;
  pendingCardLength = 0;
  collectsLength = 0;
  accountsAppvLength = 0;
  emfsLength = 0;

  //  request Card data
  currentMonthRequestCards = [];
  latestMonthRequestCard = [];
  currentMonthRequestCardLength = 0;
  currentYearRequestCardsLength = 0;
  currentWeekRequestCardLength = 0;
  requestedCardLength = 0;
  retiredCardLength = 0;

  // Card data
  currentMonthCard = [];
  latestMonthCard = [];
  currentMonthCardLength = 0;
  currentWeekCardLength = 0;
  currentYearCardLength = 0;
  currentYearRetiredCardsLength = 0;
  currentMonthRetiredCardlength = 0;
  currentMonthRetiredCard = [];
  latestMonthRetiredCards = [];
  currentWeekRetiredCards = 0;

  // subscription
  currentMonthRejectedSubscriptionLength = 0;
  currentMonthRejectedSubscription = [];
  latestMonthRejectedSubscription = [];
  currentYearRejectedSubscriptionLength = 0;
  currentWeekRejectedSubscriptionLength = 0;

  // collects data
  currentMonthAccount = [];
  latestMonthAccount = [];
  currentYearAccountLength = 0;
  currentMonthAccountLength = 0;
  currentWeekAccountLength = 0;
  currentMonthAccountAmount = 0;
  currentYearAccountAmount = 0;
  currentWeekAccountAmount = 0;

  // accounts opening data
  currentMonthAccountsAppv = [];
  latestMonthAccountsAppv = [];
  currentYearAccountsAppvLength = 0;
  currentMonthAccountsAppvLength = 0;
  currentWeekAccountsAppvLength = 0;

  constructor(private titleService: Title,
              private pageTitleService: PageTitleService,
              // private branchService: BranchService,
              // private emfService: EmfServiceService,
              // private cardService: CardService,
              // private collectsService: CollectService,

              private authService: AuthenticationService,
              // private compteService: ComptesService,
              // private subscriptionService: SubscriptionService
  ) {
    this.titleService.setTitle('2M-Bills - ' + this.subTitle);
    this.pageTitleService.changeMessage(this.subTitle);
  }

  // events
  chartClicked(e: any): void {
    // console.log(e);
  }

  chartHovered(e: any): void {
    // console.log(e);
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  getLastMonthFromDataSource(data) {
    // resMaxLength is subcrition latest subscription month number;
    let resMaxLength = 0;
    for (let i = 0; i < data.length; i++) {
      if (Number((new Date(data[i].date)).getMonth()) >= resMaxLength) {
        resMaxLength = Number((new Date(data[i].date)).getMonth());
      }
    }
    return resMaxLength;
  }

  //for pending and retired cards
  getLastMonthFromDataSourceCbs(data) {
    // resMaxLength is subcrition latest subscription month number;
    let resMaxLength = 0;
    for (let i = 0; i < data.length; i++) {
      if (Number((new Date(data[i].utilDatabase.dateCreated)).getMonth()) >= resMaxLength) {
        resMaxLength = Number((new Date(data[i].utilDatabase.dateCreated)).getMonth());
      }
    }
    return resMaxLength;
  }

  //for requested Cards
  getLastMonthFromDataSourceRequestedCards(data) {
    // resMaxLength is subcrition latest subscription month number;
    let resMaxLength = 0;
    for (let i = 0; i < data.length; i++) {
      if (Number((new Date(data[i].dateRequest)).getMonth()) >= resMaxLength) {
        resMaxLength = Number((new Date(data[i].dateRequest)).getMonth());
      }
    }
    return resMaxLength;
  }


  getFirstWeekDayDate(): Date {
    // We suppose that the first week day is monday
    const weekDay = (new Date()).getDay();
    const weekFirtDay = (new Date()).setDate((new Date()).getDate() + 1 - weekDay);
    const d = new Date(weekFirtDay);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
  }

  getWeekData(data: any): any {
    const currentDate = new Date();
    const firstWeekDate = this.getFirstWeekDayDate();
    // console.log(this.getFirstWeekDayDate());
    const indicatedData = [];
    for (let i = 0; i < data.length; i++) {
      const d = new Date(data[i].date);
      if ((d >= firstWeekDate) && (d <= currentDate)) {
        // console.log(d);
        indicatedData.push(data[i]);
      }
    }
    // console.log(indicatedData);
    return indicatedData;
  }


  //for pending and retired cards
  getWeekDataCbs(data: any): any {
    const currentDate = new Date();
    const firstWeekDate = this.getFirstWeekDayDate();
    // console.log(this.getFirstWeekDayDate());
    const indicatedData = [];
    for (let i = 0; i < data.length; i++) {
      const d = new Date(data[i].utilDatabase.dateCreated);
      if ((d >= firstWeekDate) && (d <= currentDate)) {
        // console.log(d);
        indicatedData.push(data[i]);
      }
    }
    // console.log(indicatedData);
    return indicatedData;
  }

  getWeekDataRequestedCards(data: any): any {
    const currentDate = new Date();
    const firstWeekDate = this.getFirstWeekDayDate();
    // console.log(this.getFirstWeekDayDate());
    const indicatedData = [];
    for (let i = 0; i < data.length; i++) {
      const d = new Date(data[i].dateRequest); //here is the difference
      if ((d >= firstWeekDate) && (d <= currentDate)) {
        // console.log(d);
        indicatedData.push(data[i]);
      }
    }
    // console.log(indicatedData);
    return indicatedData;
  }


  getBranches() {
    // this.branchService.getAllBranches().subscribe(
    //   res => {
    //     this.branchesList = res;
    //     this.branchesLength = res.length;
    //   },
    //   err => {
    //   }
    // );
  }

  getAtms() {
    // this.branchService.getAllAtms().subscribe(
    //     res => {
    //         this.atmsList = res;
    //         this.atmsLength = res.length;
    //     },
    //     err => {
    //         // console.log(err);
    //     }
    // );
  }

  getAllRequestedCards() {
    // this.cardService.getAllRequestedCards().subscribe(res => {
    //     this.requestedCardLength = res.length;
    //         // resMaxLength is card latest subscription month number;
    //     const resMaxLength = this.getLastMonthFromDataSourceRequestedCards(res);
    //
    //         // initialisation with dynamic length
    //     this.cardChartData[1].data = [];
    //     for (let k = 0; k < resMaxLength + 1; k++) {
    //          this.cardChartData[1].data[k] = 0;
    //     }
    //
    //     // getting chart data
    //     const today = new Date();
    //     for (let i = 0; i < res.length; i++) {
    //         const date = new Date(res[i].dateRequest);
    //         // current  request card year request array
    //         if (date.getFullYear() === today.getFullYear()) {
    //             this.currentYearRequestCardsLength++;
    //             if (date.getMonth() === today.getMonth()) {
    //                  this.currentMonthRequestCards.push(res[i]);
    //                  this.currentMonthRequestCardLength++;
    //             }
    //                 // current month card length
    //                 this.cardChartData[1].data[date.getMonth()] = Number(
    //                         this.cardChartData[1].data[date.getMonth()]) + 1;
    //             }
    //             // last month card request array
    //             if (Number(date.getMonth()) === resMaxLength - 1) {
    //                 this.latestMonthRequestCard.push(res[i]);
    //             }
    //         }
    //         // current week card request length
    //         this.currentWeekRequestCardLength = this.getWeekDataRequestedCards(res).length;
    //
    //         // check first if latest month is defined here
    //         if (this.cardChartLabels.length < this.monthsNames.slice(0, resMaxLength + 1).length) {
    //             this.cardChartLabels = this.monthsNames.slice(0, resMaxLength + 1);
    //
    //         }
    //     },
    //     err => {
    //         // console.log(err);
    //     }
    // );
  }

  getAllCards() {
    //  this.cardService.getAllCards().subscribe(res => {
    //
    //     // resMaxLength is subcrition latest subscription month number;
    //      const resMaxLength = this.getLastMonthFromDataSourceCbs(res);
    //
    //     // initialisation with dynamic length
    //      this.cardChartData[0].data = [];
    //      for (let k = 0; k < resMaxLength + 1; k++) {
    //          this.cardChartData[0].data[k] = 0;
    //      }
    //
    //      // creation of axis of abscissa represented here by month value
    //      // check first if latest month is defined here
    //      if (this.cardChartLabels.length < this.monthsNames.slice(0, resMaxLength + 1).length) {
    //          this.cardChartLabels = this.monthsNames.slice(0, resMaxLength + 1);
    //
    //      }
    //
    //      // getting chart data
    //      this.allCardsLength = 0;
    //      const retiredCard = [];
    //      const pendingCard = [];
    //      const today = new Date();
    //      for (let i = 0; i < res.length; i++) {
    //          const date = new Date(res[i].utilDatabase.dateCreated);
    //          if(res[i].status === "PENDING"){
    //              pendingCard.push(res[i]);
    //              this.pendingCardLength = pendingCard.length;
    //
    //          }
    //          // current subscription request year request array
    //          if (date.getFullYear() === today.getFullYear()) {
    //              this.currentYearCardLength++;
    //
    //              if (date.getMonth() === today.getMonth()) {
    //                  this.currentMonthCard.push(res[i]);
    //                  this.currentMonthCardLength++;
    //
    //              }
    //              this.cardChartData[0].data[date.getMonth()] = Number(this.cardChartData[0].data[date.getMonth()]) + 1;
    //          }
    //
    //
    //          if (Number(date.getMonth()) === (new Date()).getMonth() - 1) {
    //              this.latestMonthCard.push(res[i]);
    //          }
    //          this.allCardsLength++;
    //
    //          //TODO should be based on retired date which doesn't exist yet
    //                          //cartes retired details
    //          if(res[i].status === 'RETIRED'){
    //              retiredCard.push(res[i]);
    //              this.retiredCardLength = retiredCard.length;
    //              if (date.getFullYear() === today.getFullYear()) {
    //                  this.currentYearRetiredCardsLength++;
    //
    //                  if (date.getMonth() === today.getMonth()) {
    //                      this.currentMonthRetiredCard.push(res[i])
    //                      this.currentMonthRetiredCardlength++;
    //                  }
    //                  if (Number(date.getMonth()) === resMaxLength - 1) {
    //                      this.latestMonthRetiredCards.push(res[i])
    //                  }
    //              }
    //          }
    //
    //      }
    //       // this.currentMonthSubscriptionLength = Math.abs(this.currentMonthSubscription.length - this.latestMonthCard.length);
    //       this.currentWeekCardLength = this.getWeekDataCbs(res).length;
    //       this.currentWeekRetiredCards = this.getWeekDataCbs(res).length;
    //        }, err => {
    // });
  }


  getProvidedAmount() {
    // this.compteService.getCompteApprov().subscribe( res=> {
    //
    //           const resMaxLength = this.getLastMonthFromDataSourceCbs(res);
    //           let lastMonthAccountAmount = 0;
    //           const today = new Date();
    //           for (let i = 0; i < res.length; i++) {
    //               const date = new Date(res[i].utilDatabase.dateCreated);
    //              // if (res[i].ventilationStatus === 'SUCCESS') {
    //
    //                   // current year collect line array
    //                   if (date.getFullYear() === today.getFullYear()) {
    //                       this.currentYearAccountAmount += res[i].amount;
    //                       if (date.getMonth() === today.getMonth()) {
    //                           this.currentMonthAccountAmount += res[i].amount;
    //                       }
    //                   }
    //
    //                   // last month subscription request array
    //                   if (Number(date.getMonth()) === resMaxLength - 1) {
    //                       lastMonthAccountAmount += res[i].amount;
    //                   }
    //
    //                   // current month subscription length
    //                   // this.currentMonthCollectLinesAmount = Math.abs(this.currentMonthCollectLinesAmount - lastMonthCollectsLineAmount);
    //             //  }
    //           }
    //           const tempData = this.getWeekDataCbs(res);
    //           for (let j = 0; j < tempData.length; j++) {
    //             //  if (tempData.ventilationStatus === 'SUCCESS') {
    //                   this.currentWeekAccountAmount += tempData[j].amount;
    //              // }
    //           }
    //       }, err => {
    //       }
    //   );
  }

  getCompte() {
    // this.compteService.getCompte().subscribe(res =>{
    //       //  console.log('resComptes', res); //3 .....25
    //           this.collectsLength = res.length;
    //
    //           const resMaxLength = this.getLastMonthFromDataSourceCbs(res); //11 ....5
    //
    //           // initialisation with dynamic length
    //           // this.accountChartData[1].data = [];
    //           for (let k = 0; k < resMaxLength + 1; k++) {
    //               this.accountChartData[1].data[k] = 0;
    //           }
    //
    //
    //           // getting chart data
    //           const today = new Date();
    //
    //           for (let i = 0; i < res.length; i++) {
    //               const date = new Date(res[i].utilDatabase.dateCreated);
    //
    //               // current subscription request year request array
    //               if (date.getFullYear() === today.getFullYear()) {
    //                  this.currentYearAccountLength++;
    //                   // current subscription request array
    //                   if (date.getMonth() === today.getMonth()) {
    //                       this.currentMonthAccount.push(res[i]);
    //                       this.currentMonthAccountLength++;
    //
    //                   }
    //
    //                   // current month subscription length // 1
    //                   this.accountChartData[1].data[date.getMonth()] = Number(this.accountChartData[1].data[date.getMonth()]) + 1;
    //
    //               }
    //
    //               // last month subscription request array
    //               if (Number(date.getMonth()) === resMaxLength - 1) {
    //                   this.latestMonthAccount.push(res[i]);
    //
    //               }
    //
    //           }
    //           this.currentWeekAccountLength = this.getWeekDataCbs(res).length;
    //
    //           if (this.accountChartLabels.length < this.monthsNames.slice(0, resMaxLength + 1).length) {
    //               this.accountChartLabels = this.monthsNames.slice(0, resMaxLength + 1);
    //
    //           }
    //
    //       }, err => {
    //       }
    //   );
  }

  getCompteApprov() {
    // this.compteService.getCompteApprov().subscribe( res=> {
    //
    //
    //           this.accountsAppvLength = res.length;
    //           // resMaxLength is subcrition latest subscription month number;
    //           const resMaxLength = this.getLastMonthFromDataSourceCbs(res); //5
    //
    //           // initialisation with dynamic length
    //           this.accountChartData[0].data = [];
    //           for (let k = 0; k < resMaxLength + 1; k++) {
    //               this.accountChartData[0].data[k] = 0;
    //           }
    //
    //           // getting chart data
    //           const today = new Date();
    //           for (let i = 0; i < res.length; i++) {
    //               const date = new Date(res[i].utilDatabase.dateCreated);
    //
    //               // current subscription request year request array
    //               if (date.getFullYear() === today.getFullYear()) {
    //                   this.currentYearAccountsAppvLength++;
    //
    //                   // current subscription request array
    //                   if (date.getMonth() === today.getMonth()) {
    //                       this.currentMonthAccountsAppvLength++;
    //                       this.currentMonthAccountsAppv.push(res[i]); //revert
    //                   }
    //                   // current month subscription length
    //                   this.accountChartData[0].data[date.getMonth()] = Number(this.accountChartData[0].data[date.getMonth()]) + 1;
    //               }
    //
    //               // last month subscription request array
    //               if (Number(date.getMonth()) === resMaxLength - 1) {
    //                   this.latestMonthAccountsAppv.push(res[i]);
    //               }
    //
    //               // tslint:disable-next-line: max-line-length
    //
    //           }
    //           this.currentWeekAccountsAppvLength = this.getWeekDataCbs(res).length;
    //       }, err => {
    //       }
    //   );
  }

  getEmfs() {
    // this.emfService.getEmfs().subscribe( res=> {
    //
    //   this.emfsLength = res.length;
    //
    // })
  }


  ngOnInit() {
    // this.getBranches();
    this.getAllRequestedCards();
    this.getAllCards();
    this.getCompte();
    this.getCompteApprov();
    // this.getAtms();
    this.getProvidedAmount();
    // this.getEmfs();

  }

}
