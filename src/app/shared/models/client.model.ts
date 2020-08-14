import {Personnal} from './personnal.model';

export class Client {
  personnal: Personnal;
  raisonSociale: string;
  adresse: string;
  numeroRc: string;
  nature: string;

  constructor(personnal, raisonSociale, adresse, numeroRc, nature) {
    this.personnal = personnal;
    this.raisonSociale = raisonSociale;
    this.adresse = adresse;
    this.numeroRc = numeroRc;
    this.nature = nature;
  }
}

export class ClientId {

  identify: string;

  constructor(identify) {
    this.identify = identify;
  }
}

export class ClientData {
  identify: string;
  personnal: Personnal;
  raisonSociale: string;
  adresse: string;
  numeroRc: string;
  nature: string;

  dossiers: Array<string>;

  constructor(identify, personnal, raisonSociale, adresse, numeroRc, nature, dossiers) {
    this.identify = identify;
    this.personnal = personnal;
    this.raisonSociale = raisonSociale;
    this.adresse = adresse;
    this.numeroRc = numeroRc;
    this.nature = nature;
    this.dossiers = dossiers;
  }
}
