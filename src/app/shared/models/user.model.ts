export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  roleIds: Array<string>;
  branchIds: Array<string>;

  constructor(firstname, lastname, email, phone) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
  }
}

export class UserData {
  id: string;
  name: string;
  surName: string;
  email: string;
  phone: string;
  roleNames: Array<string>;

  constructor(name, surName, email, phone
              // , roleIds
  ) {
    this.name = name;
    this.surName = surName;
    this.email = email;
    this.phone = phone;
    // this.roleNames = roleIds;
  }
}
