export class Personnal {
  identify: string;
  code: string;
  firstName: string;
  lastName: string;
  numeroCni: string;
  numeroContribuable: string;
  telephone: string[];
  email: string;
  fax: string;

  constructor(code, firstName, lastName, numeroCni, numeroContribuable, telephone, email, fax, identify?) {
    this.code = code;
    this.firstName = firstName;
    this.lastName = lastName;
    this.numeroCni = numeroCni;
    this.numeroContribuable = numeroContribuable;
    this.telephone = telephone;
    this.email = email;
    this.fax = fax;
    this.identify = identify;
  }
}

export class PersonnalId {

  identify: string;

  constructor(identify) {
    this.identify = identify;
  }
}

export class PersonnalData {
  identify: string;
  code: string;
  firstName: string;
  lastName: string;
  numeroCni: string;
  numeroContribuable: string;
  telephone: string[];
  email: string;
  fax: string;
  clients: Array<string>;
  dossiersForExpediteur: Array<string>;
  dossiersForDestinataire: Array<string>;

  constructor(identify, code, firstName, lastName, numeroCni, numeroContribuable, telephone, email, fax, clients,
              dossiersForExpediteur, dossiersForDestinataire) {
    this.identify = identify;
    this.code = code;
    this.firstName = firstName;
    this.lastName = lastName;
    this.numeroCni = numeroCni;
    this.numeroContribuable = numeroContribuable;
    this.telephone = telephone;
    this.email = email;
    this.fax = fax;
    this.clients = clients;
    this.dossiersForExpediteur = dossiersForExpediteur;
    this.dossiersForDestinataire = dossiersForDestinataire;
  }
}
