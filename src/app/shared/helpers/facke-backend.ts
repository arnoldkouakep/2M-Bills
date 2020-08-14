import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const auth: any = localStorage.getItem('authDBF');
    // const branches: any[] = JSON.parse(localStorage.getItem('branches')) || [];
    // const atms: any[] = JSON.parse(localStorage.getItem('atms')) || [];
    // const collectors: any[] = JSON.parse(localStorage.getItem('collectors')) || [];
    // const collects: any[] = JSON.parse(localStorage.getItem('collects')) || [];
    // const collectLines: any[] = JSON.parse(localStorage.getItem('collectLines')) || [];
    // const cbfCustomers: any[] = JSON.parse(localStorage.getItem('cbfCustomers')) || [];
    // const accounts: any[] = JSON.parse(localStorage.getItem('accounts')) || [];
    // const customers: any[] = JSON.parse(localStorage.getItem('customers')) || [];
    // const decryptedAccounts: any[] = JSON.parse(localStorage.getItem('decryptedAccount')) || [];
    // const subscriptions: any[] = JSON.parse(localStorage.getItem('subscriptions')) || [];
    // const subscriptionRequests: any[] = JSON.parse(localStorage.getItem('subscriptionRequests')) || [];
    // const rejectedSubscriptions: any[] = JSON.parse(localStorage.getItem('rejectedSubscriptions')) || [];
    // const cbsAccount: any[] = JSON.parse(localStorage.getItem('cbsAccount')) || [];
    localStorage.setItem('currentUser', JSON.stringify({
      id: 1,
      name: 'Oscar',
      surName: 'FOUOMA',
      email: 'oscarspirit01@gmail.com',
      phone: '675484637',
      rolesId: ['1', '2'],
      branchesId: ['1']
    }));

    // const accountTypes: any[] = JSON.parse(localStorage.getItem('accountTypes')) || [
    //     {
    //         id: 1,
    //         title: 'LIV'
    //     },
    //     {
    //         id: 1,
    //         title: 'CCO'
    //     },
    //     {
    //         id: 1,
    //         title: 'EPA'
    //     }
    // ];

    // if (cbsAccount.length === 0) {
    //     for (let i = 0; i < 10; i++) {
    //         cbsAccount.push(
    //             {
    //                 id: i,
    //                 accountNumber: Number(Math.floor(Math.random() * 10000000000000) + 1000000000001),
    //                 accountType: accountTypes[Math.floor(Math.random() * 3)].title
    //             }
    //         );
    //     }
    //     localStorage.setItem('cbsAccount', JSON.stringify(cbsAccount));
    // }

    const users: any[] = JSON.parse(localStorage.getItem('users')) || [
      {
        id: 1,
        name: 'Arnold',
        surName: 'BENI',
        email: 'kouakeparnold27@gmail.com',
        phone: '673459773',
        rolesId: ['1', '2'],
        branchesId: ['1']
      }];
    const parameters: any[] = JSON.parse(localStorage.getItem('parameters')) || [
      {
        currencyCode: 'AF9',
        currencyBank: '23546',
        ribFormat: '0',
        statementNbLinesMax: 15,
        statementDateBeforeMax: '45',
        cashInMax: 4500000,
        transferMax: 5450000,
        statementRangeMax: 900000
      }
    ];

    // if (accounts.length === 0) {
    //     for (let i = 0; i < 15; i++) {
    //         accounts.push(
    //             {
    //                 id: i,
    //                 accountNumber: Number(Math.floor(Math.random() * 10000000000000) + 1000000000001),
    //                 accountTitle: faker.name.findName(),
    //                 accountType: accountTypes[Math.floor(Math.random() * 3)].title,
    //                 branch: '00' + Number(Math.floor(Math.random() * 10) + 1)
    //             }
    //         );
    //     }
    //     localStorage.setItem('accounts', JSON.stringify(accounts));
    // }

    // if (decryptedAccounts.length === 0) {
    //     for (let i = 0; i < 15; i++) {
    //         decryptedAccounts.push(
    //             {
    //                 id: i,
    //                 phone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 codeType: accountTypes[Math.floor(Math.random() * 3)].title,
    //                 branchCode: '00' + Number(Math.floor(Math.random() * 10) + 1),
    //                 numberMember: '00' + Number(Math.floor(Math.random() * 1000000000) + 100000000),
    //                 name: faker.name.lastName(),
    //                 surName: faker.name.firstName(),
    //                 dateBirth: new Date(),
    //                 isActif: [true, false][Math.floor(Math.random() * 2)],
    //                 decryptedLine: [true, false][Math.floor(Math.random() * 2)],
    //                 accountNumber: Number(Math.floor(Math.random() * 10000000000000) + 1000000000001),
    //                 accountTitle: faker.name.findName()
    //             }
    //         );
    //     }
    //     localStorage.setItem('decryptedAccounts', JSON.stringify(accounts));
    // }

    // if (customers.length === 0) {
    //     for (let j = 0; j < 10; j++) {
    //         customers.push(
    //             {
    //                 id: j,
    //                 name: faker.name.lastName(),
    //                 surName: faker.name.firstName(),
    //                 digitsCard: Number(Math.floor(Math.random() * 10000000) + 1000000),
    //                 phone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 dateBirth: this.randomDate(new Date(1950, 0, 1), new Date()),
    //                 memberNumber: '00' + Number(Math.floor(Math.random() * 1000000000) + 100000000),
    //                 accounts: [accounts[Math.floor(Math.random() * 8)], accounts[Math.floor(Math.random() * 8)]]
    //             }
    //         );
    //     }
    //     localStorage.setItem('customers', JSON.stringify(customers));
    //     console.log(customers);
    // }

    // if (branches.length === 0) {
    //     for (let k = 0; k < 10; k++) {
    //         branches.push(
    //             {
    //                 id: k,
    //                 name: faker.address.streetAddress(),
    //                 latitude: faker.address.latitude(),
    //                 longitude: faker.address.longitude(),
    //                 phone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 address: faker.address.secondaryAddress(),
    //                 town: faker.address.city(),
    //                 quarter: faker.address.streetName(),
    //                 fax: Math.floor(Math.random() * 100000) + 10000,
    //                 postBox: Math.floor(Math.random() * 1000) + 1000,
    //             }
    //         );
    //     }
    //     localStorage.setItem('branches', JSON.stringify(branches));
    // }

    // if (subscriptionRequests.length === 0) {
    //     for (let i = 0; i < 20; i++) {
    //         subscriptionRequests.push(
    //             {
    //                 id: i,
    //                 name: faker.name.lastName(),
    //                 surName: faker.name.firstName(),
    //                 dateBirth: this.randomDate(new Date(1950, 0, 1), new Date()),
    //                 lastDigitsCard: '0' + Number(Math.floor(Math.random() * 100) + 100),
    //                 branchName: branches[Math.floor(Math.random() * 10)].name,
    //                 memberNumber: '00' + Number(Math.floor(Math.random() * 1000000000) + 100000000)
    //             }
    //         );
    //     }
    //     localStorage.setItem('subscriptionRequests', JSON.stringify(subscriptionRequests));
    // }

    // if (subscriptions.length === 0) {
    //     for (let l = 0; l < 10; l++) {
    //         subscriptions.push(
    //             {
    //                 id: l,
    //                 subscriptionRequest: subscriptionRequests[Math.floor(Math.random() * 20)],
    //                 cbsAccount: cbsAccount[Math.floor(Math.random() * 10)],
    //                 // accountNumber: accounts[Math.floor(Math.random() * 15)].accountNumber,
    //                 // accountTitle: faker.name.lastName() + ' ' + faker.name.firstName(),
    //                 // phone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 // memberNumber: '00' + Number(Math.floor(Math.random() * 1000000000) + 100000000),
    //             }
    //         );
    //     }
    //     localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    //     console.log(subscriptions);
    // }

    // if (atms.length === 0) {
    //     for (let k = 0; k < 10; k++) {
    //         atms.push(
    //             {
    //                 id: k,
    //                 name: faker.address.streetAddress(),
    //                 latitude: faker.address.latitude(),
    //                 longitude: faker.address.longitude(),
    //                 phone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 address: faker.address.secondaryAddress(),
    //                 town: faker.address.city(),
    //                 quarter: faker.address.streetName(),
    //                 fax: Math.floor(Math.random() * 100000) + 10000,
    //                 postBox: Math.floor(Math.random() * 1000) + 1000,
    //             }
    //         );
    //     }
    //     localStorage.setItem('atms', JSON.stringify(atms));
    // }

    // if (rejectedSubscriptions.length === 0) {
    //     for (let l = 0; l < 10; l++) {
    //         rejectedSubscriptions.push(
    //             {
    //                 id: l,
    //                 subscriptionRequest: subscriptionRequests[Math.floor(Math.random() * 20)],
    //                 motif: 'Sociétaire insolvable'
    //             }
    //         );
    //     }
    //     localStorage.setItem('rejectedSubscriptions', JSON.stringify(rejectedSubscriptions));
    //     console.log(rejectedSubscriptions);
    // }

    // if (collectLines.length === 0) {
    //     for (let l = 0; l < 20; l++) {
    //         collectLines.push(
    //             {
    //                 id: l,
    //                 amount: faker.finance.amount(),
    //                 account: accounts[Math.floor(Math.random() * 15)],
    //                 date: new Date(),
    //                 reason: faker.lorem.sentence(),
    //                 status: ['ventilé', 'en attente'][Math.floor(Math.random() * 2)]
    //             }
    //         );
    //     }
    //     localStorage.setItem('collectLines', JSON.stringify(collectLines));
    //     console.log(collectLines);
    // }

    // if (collects.length === 0) {
    //     for (let l = 0; l < 10; l++) {
    //         collects.push(
    //             {
    //                 id: l,
    //                 creationDate: new Date(),
    //                 ventilationDate: new Date(),
    //                 status: ['ventilé', 'en attente'][Math.floor(Math.random() * 2)],
    //                 collectLines: [
    //                     collectLines[Math.floor(Math.random() * 20)],
    //                     collectLines[Math.floor(Math.random() * 20)],
    //                     collectLines[Math.floor(Math.random() * 20)],
    //                     collectLines[Math.floor(Math.random() * 20)]
    //                 ]
    //             }
    //         );
    //     }
    //     localStorage.setItem('collects', JSON.stringify(collects));
    //     console.log(collects);
    // }

    // if (collectors.length === 0) {
    //     const currentCollect = [];
    //     for (let i = 0; i < 10; i++) {
    //         currentCollect.push({
    //             id: i,
    //             creationDate: new Date(),
    //             ventilationDate: null,
    //             collectLines: [
    //                 collectLines[Math.floor(Math.random() * 20)],
    //                 collectLines[Math.floor(Math.random() * 20)],
    //                 collectLines[Math.floor(Math.random() * 20)],
    //                 collectLines[Math.floor(Math.random() * 20)],
    //                 collectLines[Math.floor(Math.random() * 20)]
    //             ]
    //         });
    //     }
    //     for (let l = 0; l < 10; l++) {
    //         collectors.push(
    //             {
    //                 id: l,
    //                 account: accounts[Math.floor(Math.random() * 15)],
    //                 branch: branches[Math.floor(Math.random() * 10)],
    //                 currentCollect: currentCollect[l],
    //                 collects: [
    //                     collects[Math.floor(Math.random() * 10)],
    //                     collects[Math.floor(Math.random() * 10)],
    //                     collects[Math.floor(Math.random() * 10)],
    //                     collects[Math.floor(Math.random() * 10)]
    //                 ],
    //                 sponsorName: faker.name.lastName() + ' ' + faker.name.firstName(),
    //                 amount: Number(faker.finance.amount()) * 5,
    //                 sponsorPhone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 currentCollectStatus: ['En cours', 'Non debuté'][Math.floor(Math.random() * 2)]
    //             }
    //         );
    //     }
    //     localStorage.setItem('collectors', JSON.stringify(collectors));
    //     console.log(collectors);
    // }

    // if (cbfCustomers.length === 0) {
    //     for (let l = 0; l < 10; l++) {
    //         cbfCustomers.push(
    //             {
    //                 id: l,
    //                 collector: collectors[l],
    //                 name: faker.name.lastName(),
    //                 surName: faker.name.firstName(),
    //                 streetName: faker.address.streetName(),
    //                 streetNumber: Number(Math.floor(Math.random() * 1000) + 1000),
    //                 memberNumber: '00' + Number(Math.floor(Math.random() * 1000000000) + 100000000),
    //                 phone: '+242' + Number(Math.floor(Math.random() * 10000000) + 10000000),
    //                 gender: ['Homme', 'Femme'][Math.floor(Math.random() * 2)],
    //                 civilRegistry: ['Marié', 'Celibataire'][Math.floor(Math.random() * 2)],
    //                 firstDeposit: faker.finance.amount(),
    //                 address: faker.address.secondaryAddress(),
    //                 status: ['activé', 'en attente'][Math.floor(Math.random() * 2)]
    //             }
    //         );
    //     }
    //
    //     localStorage.setItem('cbfCustomers', JSON.stringify(cbfCustomers));
    //     console.log(collects);
    // }
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {
      // authenticate
      if (request.url.endsWith('/login') && request.method === 'POST') {
        console.log('test');
        // find if any user matches login credentials
        const filteredUsers = users.filter(user => {
          return user.phone === request.body.phone;
        });
        console.log(filteredUsers);
        if (filteredUsers.length) {
          console.log(filteredUsers);
          // if login details are valid return 200 OK with user details and fake jwt token
          const user = filteredUsers[0];
          const body = {
            id: user.id,
            username: user.name,
            firstName: user.surName,
            phone: user.phone,
            email: user.email,
            roles: user.rolesId,
            branches: user.branchesId
          };
          localStorage.setItem('currentUser', JSON.stringify(body));
          return of(new HttpResponse({status: 200, body}));
        } else {
          console.log('falled');
          // else return 400 bad request
          return throwError({error: {message: 'Username or password is incorrect'}});
        }
      }

      // users management
      // get users
      if (request.url.endsWith('/user') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid,
        // this security is implemented server side in a real application
        // if (auth !== undefined) {
        console.log(users);
        return of(new HttpResponse({status: 200, body: users}));
        // } else {
        //     console.log(request.headers.get('Authorization'));
        //     console.log(auth);
        //     // return 401 not authorised if token is null or invalid
        //     return throwError({ error: { message: 'Unauthorised' } });
        // }
      }

      // get user by id
      if (request.url.match(/\/user\/\d+$/) && request.method === 'GET') {
        // check for fake auth token in header and return user
        // if valid, this security is implemented server side in a real application
        if (auth !== undefined) {
          // find user by id in users array
          const urlParts = request.url.split('/');
          // tslint:disable-next-line:radix
          const id = parseInt(urlParts[urlParts.length - 1]);
          // tslint:disable-next-line:no-shadowed-variable
          const matchedUsers = users.filter(user => user.id === id);
          const user = matchedUsers.length ? matchedUsers[0] : null;

          return of(new HttpResponse({status: 200, body: user}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({error: {message: 'Unauthorised'}});
        }
      }

      // register user
      if (request.url.endsWith('/user') && request.method === 'POST') {
        // get new user object from post body
        const newUser = request.body;
        console.log(request.body);
        // validation
        const duplicateUser = users.filter(user => user.phone === newUser.phone).length;
        if (duplicateUser) {
          return throwError({error: {message: 'Username "' + newUser.phone + '" is already taken'}});
        }
        // save new user
        newUser.id = users.length + 1;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // respond 200 OK
        return of(new HttpResponse({status: 200}));
      }

      // delete user
      if (request.url.match(/\/user\/\d+$/) && request.method === 'DELETE') {
        // check for fake auth token in header and return user if valid,
        // this security is implemented server side in a real application
        if (auth !== undefined) {
          // find user by id in users array
          const urlParts = request.url.split('/');
          // tslint:disable-next-line:radix
          const id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user.id === id) {
              // delete user
              users.splice(i, 1);
              localStorage.setItem('users', JSON.stringify(users));
              break;
            }
          }

          // respond 200 OK
          return of(new HttpResponse({status: 200}));
        } else {
          // return 401 not authorised if token is null or invalid
          return throwError({error: {message: 'Unauthorised'}});
        }
      }

      // parameters management
      // get parameters
      if (request.url.endsWith('/parameter') && request.method === 'GET') {
        // check for fake auth token in header and return users if valid,
        // this security is implemented server side in a real application
        // if (auth !== undefined) {
        console.log(parameters);
        return of(new HttpResponse({status: 200, body: parameters}));
        // } else {
        //     console.log(request.headers.get('Authorization'));
        //     console.log(auth);
        //     // return 401 not authorised if token is null or invalid
        //     return throwError({ error: { message: 'Unauthorised' } });
        // }
      }

      // edit parameters
      if (request.url.endsWith('/parameter') && request.method === 'PUT') {
        // get new parameters object from post body
        const newParameters = request.body;
        console.log(request.body);
        // save new paramaters
        localStorage.setItem('parameters', JSON.stringify(newParameters));
        // respond 200 OK
        return of(new HttpResponse({status: 200}));
      }

      // branches management
      // get branches
      // if (request.url.endsWith('/branch') && request.method === 'GET') {
      //     console.log(branches);
      //     return of(new HttpResponse({ status: 200, body: branches }));
      // }

      // get branch by id
      // if (request.url.match(/\/branch\/\d+$/) && request.method === 'GET') {
      //     // check for fake auth token in header and return user
      //     // if valid, this security is implemented server side in a real application
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         // tslint:disable-next-line:no-shadowed-variable
      //         const matchedBranches = branches.filter(branch => branch.id === id);
      //         const branch = matchedBranches.length ? matchedBranches[0] : null;
      //
      //         return of(new HttpResponse({ status: 200, body: branch }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // register branches
      // if (request.url.endsWith('/branch') && request.method === 'POST') {
      //     // get new branch object from post body
      //     const newBranch = request.body;
      //     console.log(request.body);
      //     // validation
      //     const duplicateUser = branches.filter(branch => branch.name === newBranch.name).length;
      //     if (duplicateUser) {
      //         return throwError({ error: { message: 'Name "' + newBranch.name + '" is already taken' } });
      //     }
      //     // save new branch
      //     newBranch.id = branches.length + 1;
      //     branches.push(newBranch);
      //     localStorage.setItem('branches', JSON.stringify(branches));
      //
      //     // respond 200 OK
      //     return of(new HttpResponse({ status: 200 }));
      // }

      // update branch
      // if (request.url.match(/\/branch\/\d+$/) && request.method === 'PUT') {
      //     // check for fake auth token in header and return branch if valid,
      //     // this security is implemented server side in a real application
      //     const newBranch = request.body;
      //     console.log(request.body);
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         for (let i = 0; i < branches.length; i++) {
      //             if (branches[i].id === id) {
      //                 newBranch.id = i;
      //                 branches[i] = newBranch;
      //                 localStorage.setItem('branches', JSON.stringify(branches));
      //                 break;
      //             }
      //         }
      //         // respond 200 OK
      //         return of(new HttpResponse({ status: 200 }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // delete branch
      // if (request.url.match(/\/branch\/\d+$/) && request.method === 'DELETE') {
      //     // check for fake auth token in header and return branch if valid,
      //     // this security is implemented server side in a real application
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         for (let i = 0; i < branches.length; i++) {
      //             const branch = branches[i];
      //             if (branch.id === id) {
      //                 // delete branch
      //                 branches.splice(i, 1);
      //                 localStorage.setItem('branches', JSON.stringify(branches));
      //                 break;
      //             }
      //         }
      //         // respond 200 OK
      //         return of(new HttpResponse({ status: 200 }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // atms management
      // get atms
      // if (request.url.endsWith('/atm') && request.method === 'GET') {
      //     console.log(atms);
      //     return of(new HttpResponse({ status: 200, body: atms }));
      // }

      // get atm by id
      // if (request.url.match(/\/atm\/\d+$/) && request.method === 'GET') {
      //     // check for fake auth token in header and return user
      //     // if valid, this security is implemented server side in a real application
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         // tslint:disable-next-line:no-shadowed-variable
      //         const matchedBranches = branches.filter(branch => branch.id === id);
      //         const branch = matchedBranches.length ? matchedBranches[0] : null;
      //
      //         return of(new HttpResponse({ status: 200, body: branch }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // register atm
      // if (request.url.endsWith('/atm') && request.method === 'POST') {
      //     // get new branch object from post body
      //     const newAtm = request.body;
      //     console.log(request.body);
      //     // validation
      //     const duplicateUser = atms.filter(atm => atm.name === newAtm.name).length;
      //     if (duplicateUser) {
      //         return throwError({ error: { message: 'Name "' + newAtm.name + '" is already taken' } });
      //     }
      //     // save new branch
      //     newAtm.id = atms.length + 1;
      //     atms.push(newAtm);
      //
      //     localStorage.setItem('atms', JSON.stringify(atms));
      //
      //     // respond 200 OK
      //     return of(new HttpResponse({ status: 200 }));
      // }

      // update atm
      // if (request.url.match(/\/atm\/\d+$/) && request.method === 'PUT') {
      //     // check for fake auth token in header and return branch if valid,
      //     // this security is implemented server side in a real application
      //     const newBranch = request.body;
      //     console.log(request.body);
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         for (let i = 0; i < branches.length; i++) {
      //             if (branches[i].id === id) {
      //                 newBranch.id = i;
      //                 branches[i] = newBranch;
      //                 localStorage.setItem('branches', JSON.stringify(branches));
      //                 break;
      //             }
      //         }
      //         // respond 200 OK
      //         return of(new HttpResponse({ status: 200 }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // delete atm
      // if (request.url.match(/\/atm\/\d+$/) && request.method === 'DELETE') {
      //     // check for fake auth token in header and return branch if valid,
      //     // this security is implemented server side in a real application
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         for (let i = 0; i < branches.length; i++) {
      //             const branch = branches[i];
      //             if (branch.id === id) {
      //                 // delete branch
      //                 branches.splice(i, 1);
      //                 localStorage.setItem('branches', JSON.stringify(branches));
      //                 break;
      //             }
      //         }
      //         // respond 200 OK
      //         return of(new HttpResponse({ status: 200 }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }


      // subscriptions management
      // get all subscriptions
      // if (request.url.endsWith('/subscription') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: subscriptions }));
      // }

      // get subscriptions
      // if (request.url.endsWith('/subscriptionRequest') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: subscriptionRequests }));
      // }

      // get rejected subscriptions
      // if (request.url.endsWith('/rejectedSubscription') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: rejectedSubscriptions }));
      // }

      // get subscription by id
      // if (request.url.match(/\/subscription\/\d+$/) && request.method === 'GET') {
      //     // check for fake auth token in header and return user
      //     // if valid, this security is implemented server side in a real application
      //     if (auth !== undefined) {
      //         // find subscription by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         // tslint:disable-next-line:no-shadowed-variable
      //         const matchedSubscriptions = subscriptions.filter(subscription => subscription.id === id);
      //         const subscription = matchedSubscriptions.length ? matchedSubscriptions[0] : null;
      //
      //         return of(new HttpResponse({ status: 200, body: subscription }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // register subscriptions
      // if (request.url.endsWith('/subscription') && request.method === 'POST') {
      //     // get new user object from post body
      //     const newSubscription = request.body;
      //     console.log(request.body);
      //     // validation
      //     const duplicateUser = subscriptions.filter(subscription => subscription.name === newSubscription.name).length;
      //     // if (duplicateUser) {
      //     //     return throwError({ error: { message: 'Name "' + newsubscriptions.name + '" is already taken' } });
      //     // }
      //     // save new user
      //     newSubscription.id = subscriptions.length + 1;
      //     subscriptions.push(newSubscription);
      //     localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      //
      //     // respond 200 OK
      //     return of(new HttpResponse({ status: 200 }));
      // }

      // delete branch
      // if (request.url.match(/\/subscription\/\d+$/) && request.method === 'DELETE') {
      //     // check for fake auth token in header and return branch if valid,
      //     // this security is implemented server side in a real application
      //     if (auth !== undefined) {
      //         // find branch by id in branches array
      //         const urlParts = request.url.split('/');
      //         // tslint:disable-next-line:radix
      //         const id = parseInt(urlParts[urlParts.length - 1]);
      //         for (let i = 0; i < subscriptions.length; i++) {
      //             const branch = subscriptions[i];
      //             if (branch.id === id) {
      //                 // delete branch
      //                 subscriptions.splice(i, 1);
      //                 localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      //                 break;
      //             }
      //         }
      //         // respond 200 OK
      //         return of(new HttpResponse({ status: 200 }));
      //     } else {
      //         // return 401 not authorised if token is null or invalid
      //         return throwError({ error: { message: 'Unauthorised' } });
      //     }
      // }

      // accounts management
      // get accounts
      // if (request.url.endsWith('/account') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: accounts }));
      // }

      // get all accountTypes
      // if (request.url.endsWith('/accountType') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: accountTypes }));
      // }

      // import encrypted account to backend
      // if (request.url.endsWith('/decryptedAccountList') && request.method === 'POST') {
      //     return of(new HttpResponse({ status: 200, body: decryptedAccounts }));
      // }

      // customers management
      // get all customers
      // if (request.url.endsWith('/customer') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: customers }));
      // }

      // collects management
      // create collectos
      // if (request.url.endsWith('/collectors') && request.method === 'POST') {
      //     // get new user object from post body
      //     const newCollector = request.body;
      //     console.log(request.body);
      //     // validation
      //     // const duplicateUser = collectors.filter(collector => collector.name === newCollector.name).length;
      //     newCollector.id = collectors.length + 1;
      //     collectors.push(newCollector);
      //     localStorage.setItem('collectors', JSON.stringify(collectors));
      //
      //     // respond 200 OK
      //     return of(new HttpResponse({ status: 200 }));
      // }

      // get all collectors
      // if (request.url.endsWith('/collectors') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: collectors }));
      // }

      // get all validated collects
      // if (request.url.endsWith('/collects') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: collects }));
      // }

      // get new customers
      // if (request.url.endsWith('/cbfCustomers') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: cbfCustomers }));
      // }

      // get customer created
      // if (request.url.endsWith('/collectLines') && request.method === 'GET') {
      //     return of(new HttpResponse({ status: 200, body: collectLines }));
      // }

      // pass through any requests not handled above
      return next.handle(request);
    }))

    // call materialize and dematerialize to ensure delay even if an error is
    // thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
