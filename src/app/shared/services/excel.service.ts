import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {NumberSeparatorPipe} from '../utils/number-separator.pipe';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private numberSeparatorPipe: NumberSeparatorPipe) {
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {Sheets: {'Liste des Sociétaires': worksheet}, SheetNames: ['Liste des Sociétaires']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  transform(d: any): string {
    if (d === '' || d === undefined) {
      return '';
    }
    const date = new Date(d);
    date.toLocaleString('fr-FR', {hour: 'numeric', hour12: true});
    const monthNames = [
      'Janv', 'Févr', 'Mars',
      'Avr', 'Mai', 'Juin', 'Juill',
      'août', 'Sep', 'Oct',
      'Nov', 'Dec'
    ];
    const m = Number(date.getMonth() + 1);
    const month = m < 10 ? '0' + m : m;
    // date.getDayInMonth(date.getMonth(), date.getFullYear());
    const year = date.getFullYear();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return day + '/' + month + '/' + year + '-' + hours + ':' + min;
  }

  public exportDetailsCollector(collector: any, collects: any[], accountOpening: any[]): void {
    const collectsView = [];
    collects.forEach(collect => {
      collectsView.push({
        Identifiant: collect.id,
        'Date création': collect.date,
        Statut: collect.isClose ? 'Fermé' : 'Ouvert'
      });
    });
    if (collectsView.length === 0) {
      collectsView.push({
        Identifiant: '',
        'Date création': '',
        Statut: ''
      });
    }
    const workbook: XLSX.WorkBook = {
      Sheets: {
        Collectes: XLSX.utils.json_to_sheet(collectsView),
        'Comptes Ouverts': XLSX.utils.json_to_sheet(this.accountOpeningToJsonSheet(accountOpening))
      },
      SheetNames: ['Collectes', 'Comptes Ouverts']
    };
    this.saveAsExcelFile(workbook, 'Détails collecteur ' + collector.name);
  }

  public exportDetailsCollect(collect: any, collectLines: any[], accountOpening: any[]): void {
    const collectLinesView = [];
    collectLines.forEach(line => {
      collectLinesView.push({
        'Reference transaction': line.referenceTransaction,
        'Numéro de compte': line.accountNumber,
        Intitulé: line.accountTitle,
        Montant: line.amount,
        'Date création': line.date,
        'Type de compte': line.accountType,
        Statut: line.status
      });
    });
    if (collectLinesView.length === 0) {
      collectLinesView.push({
        'Reference transaction': '',
        'Numéro de compte': '',
        Intitulé: '',
        Montant: '',
        'Date création': '',
        'Type de compte': '',
        Statut: ''
      });
    }
    const workbook: XLSX.WorkBook = {
      Sheets: {
        'Lignes des Collectes': XLSX.utils.json_to_sheet(collectLinesView),
        'Comptes Ouverts': XLSX.utils.json_to_sheet(this.accountOpeningToJsonSheet(accountOpening))
      },
      SheetNames: ['Lignes des Collectes', 'Comptes Ouverts']
    };
    this.saveAsExcelFile(workbook, 'Détails collecte ' + collect.status + ' de ' + collect.collector.name + ' du ' +
      collect.creationDate);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + this.transform(new Date().getTime()) + EXCEL_EXTENSION);
  }

  private accountOpeningToJsonSheet(accountOpening: any[]): any[] {
    const accountOpeningView = [];
    accountOpening.forEach(account => {
      accountOpeningView.push({
        'Reference Transaction': account.reference,
        'Date de création': account.dateOpen,
        'Date de ventilation': account.lastVentilationDate,
        Montant: this.numberSeparatorPipe.transform(account.amount),
        Statut: account.status,
        Nom: account.name,
        Téléphone: account.phone,
        'Nom de la rue': account.streetName,
        Civilité: account.civilRegistry,
        Sexe: account.gender
      });
    });
    if (accountOpeningView.length === 0) {
      accountOpeningView.push({
        'Reference Transaction': '',
        'Date de création': '',
        'Date de ventilation': '',
        Montant: '',
        Statut: ''
      });
    }
    return accountOpeningView;
  }
}
