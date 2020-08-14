import {Personnal} from './personnal.model';
import {Client} from './client.model';

export class Dossier {
  identify: string;
  client: Client;
  personnalByExpediteur: Personnal;
  personnalByDestinataire: Personnal;
  numeroDossier: string;
  dateMiseEnPlace: Date;
  repertoire: string;
  category: string;
  numeroTarifaire: string;
  montantDeclare: number;
  bureau: string;
  regime: string;
  numeroDeclaration: number;
  dateDeclaration: Date;
  montantTaxe: number;
  observation: string;

  constructor(client, personnalByExpediteur, personnalByDestinataire, numeroDossier, dateMiseEnPlace,
              repertoire, category, numeroTarifaire, montantDeclare, bureau, regime, numeroDeclaration,
              dateDeclaration, montantTaxe, observation) {
    this.client = client;
    this.personnalByExpediteur = personnalByExpediteur;
    this.personnalByDestinataire = personnalByDestinataire;
    this.numeroDossier = numeroDossier;
    this.dateMiseEnPlace = dateMiseEnPlace;
    this.repertoire = repertoire;
    this.category = category;
    this.numeroTarifaire = numeroTarifaire;
    this.montantDeclare = montantDeclare;
    this.bureau = bureau;
    this.regime = regime;
    this.numeroDeclaration = numeroDeclaration;
    this.dateDeclaration = dateDeclaration;
    this.montantTaxe = montantTaxe;
    this.observation = observation;
  }
}


export class DossierId {

  identify: string;

  constructor(identify) {
    this.identify = identify;
  }
}

export class DossierData {

  identify: string;
  client: Client;
  personnalByExpediteur: Personnal;
  personnalByDestinataire: Personnal;
  numeroDossier: string;
  dateMiseEnPlace: Date;
  repertoire: string;
  category: string;
  numeroTarifaire: string;
  montantDeclare: number;
  bureau: string;
  regime: string;
  numeroDeclaration: number;
  dateDeclaration: Date;
  montantTaxe: number;
  observation: string;

  constructor(identify, client, personnalByExpediteur, personnalByDestinataire, numeroDossier, dateMiseEnPlace, repertoire,
              category, numeroTarifaire, montantDeclare, bureau, regime, numeroDeclaration, dateDeclaration, montantTaxe, observation) {
    this.identify = identify;
    this.client = client;
    this.personnalByExpediteur = personnalByExpediteur;
    this.personnalByDestinataire = personnalByDestinataire;
    this.numeroDossier = numeroDossier;
    this.dateMiseEnPlace = dateMiseEnPlace;
    this.repertoire = repertoire;
    this.category = category;
    this.numeroTarifaire = numeroTarifaire;
    this.montantDeclare = montantDeclare;
    this.bureau = bureau;
    this.regime = regime;
    this.numeroDeclaration = numeroDeclaration;
    this.dateDeclaration = dateDeclaration;
    this.montantTaxe = montantTaxe;
    this.observation = observation;
  }
}
