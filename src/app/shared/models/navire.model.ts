export class Navire {
  identify: string;
  code: string;
  libelle: string;
  dossierNavires: Array<string>;

  constructor(code, libelle) {
    this.code = code;
    this.libelle = libelle;
  }
}

export class NavireId {

  identify: string;

  constructor(identify) {
    this.identify = identify;
  }
}

export class NavireData {
  identify: string;
  code: string;
  libelle: string;
  dossierNavires: Array<string>;

  constructor(identify, code, libelle, dossierNavires) {
    this.identify = identify;
    this.code = code;
    this.libelle = libelle;
    this.dossierNavires = dossierNavires;
  }
}
