import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserData} from '../models/user.model';
import backendUrl from '../../../assets/backendUrl.json';

@Injectable()
export class UserService {


  httpOptions: { headers: HttpHeaders; };

  branchesSource = new BehaviorSubject<any>(null);

  selectedUser: any = {};
  selectedUserSource = new BehaviorSubject(this.selectedUser);

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getAllUsers(): any {

    return this.http.get<any>(backendUrl.content + 'cbs-user', this.authService.getMainHeader());
  }

  // old
  // getAll(): any {
  //     return this.http.get<any>('/user', this.authService.getMainHeader());
  // }

  getById(id: number) {
    return this.http.get('/user/' + id, this.authService.getMainHeader());
  }

  create(user: any) {
    const httpOptions: any = {
      responseType: 'text' as 'text'
    };
    return this.http.post<any>(backendUrl.content + 'cbs-user', user, httpOptions);
  }

  update(user: any) {
    const httpOptions: any = {
      responseType: 'text' as 'text'
    };
    return this.http.put<any>(backendUrl.content + 'cbs-user', user, httpOptions);
  }


  // old
  // create(user: any) {
  //     return this.http.post('/user', user, this.authService.getMainHeader());
  // }

  //old
  // update(user: any) {
  //     return this.http.put('/user', user, this.authService.getMainHeader());
  // }

  delete(id: number) {
    return this.http.delete('/users/' + id, this.authService.getMainHeader());
  }

  getIdentityRoles(): any {
    return this.http.get('/identityRoles', this.authService.getMainHeader());
  }

  getRoles(): any {

    return this.http.get<any>(backendUrl.content + 'cbs-role', this.authService.getMainHeader());
  }

  getUserBranches(): any {
    return this.http.get('/userBranch', this.authService.getMainHeader());
  }

  getAllEmfs(): Observable<any> {
    return null;//this.http.get<Emf[]>(backendUrl.content + 'cbs-emf');
    // return this.http.get('./../../../assets/branches.json');
  }

  getCurrentUser(): any {
    return localStorage.getItem('currentUser');
  }

  currentUser(): UserData {
    const data = JSON.parse(this.getCurrentUser());
    return new UserData(
      data.user.name, data.user.surName, data.user.email, data.user.phone);
  }

  filterCollectByUserBranches(data: any, msg?) {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    const userBranch: any = currentUser.branchs;
    const response = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < userBranch.length; j++) {
        if (data[i].collector) {
          // const isExisted = response.filter(element => element.id ===);
          if (data[i].collector.branch) {
            if (userBranch[j].id === data[i].collector.branch.id) {
              // console.log(data[i].branch.id + '/' + userBranch[j].id);
              response.push(data[i]);
            }
          } else {
            if (msg) {
              console.error(msg + '(collector branch)', data[i].collector);
            } else {
              console.error('filterCollectByUserBranches No branch collector: ', data[i]);
            }
          }
        } else {
          if (msg) {
            console.error(msg, data[i]);
          } else {
            console.error('filterCollectByUserBranches No collector: ', data[i]);
          }
        }
      }
    }
    // return data;
    return null; //response;
  }

  filterCbfCustomersByUserBranches(data: any) {
    return this.filterCollectByUserBranches(data, 'filterCbfCustomersByUserBranches No match: ');
  }

  filterCollectorByUserBranches(data: any) {
    return this.filterBranchByUserBranches(data, 'filterBranchByUserBranches No match: ');
  }

  filterCustomerByUserBranches(data: any) {
    return this.filterBranchByUserBranches(data, 'filterCustomerByUserBranches No match: ');
  }

  filterSubscriptionByUserBranches(data: any) {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    const userBranch: any = currentUser.branchs;
    const response = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < userBranch.length; j++) {
        if (data[i].account) {
          if (data[i].account.branch) {
            if (userBranch[j].id === data[i].account.branch.id) {
              response.push(data[i]);
            }
          }
        } else {
          console.error('filterSubscriptionByUserBranches No account.branch: ', data[i]);
        }
      }
    }
    // return data;
    return response;
  }

  filterSubscriptionRequestByUserBranches(data: any) {
    // const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    // const userBranch: any = currentUser.branchs;
    // const response = [];
    //
    // for (let i = 0; i < data.length; i++) {
    //
    //     for (let j = 0; j < userBranch.length; j++) {
    //         if (data[i].branch) {
    //             /*console.log('fsrByUserBranches data branch - ' + userBranch[j].id + '/' + data[i].branch.id + ' equals ? ',
    //                 userBranch[j].id === data[i].branch.id);*/
    //             if (userBranch[j].id === data[i].branch.id) {
    //                 response.push(data[i]);
    //             }
    //         }
    //     }
    // }
    // return data;
    return null;//response;
  }

  filterAccountByUserBranches(data: any) {
    return this.filterBranchByUserBranches(data, 'filterAccountByUserBranches No match: ');
  }

  getDataByUserBranches(data: any) {
    // const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    // const userBranch: any = currentUser.branchs;
    // const response = [];
    // for (let i = 0; i < data.length; i++) {
    //     for (let j = 0; j < userBranch.length; j++) {
    //         if (data[i].name && data[i].code) {
    //             // const isExisted = response.filter(element => element.id ===);
    //             if (userBranch[j].id === data[i].id) {
    //                 // console.log(data[i].branch.id + '/' + userBranch[j].id);
    //                 response.push(data[i]);
    //             }
    //         } else if (data[i].customer) {
    //             // const isExisted = response.filter(element => element.id ===);
    //             if (userBranch[j].id === data[i].customer.branch) {
    //                 if (userBranch[j].id === data[i].customer.branch.id) {
    //                     // console.log(data[i].branch.id + '/' + userBranch[j].id);
    //                     response.push(data[i]);
    //                 }
    //             }
    //         } else if (data[i].collector) {
    //             // const isExisted = response.filter(element => element.id ===);
    //             if (userBranch[j].id === data[i].collector.branch) {
    //                 if (userBranch[j].id === data[i].collector.branch.id) {
    //                     // console.log(data[i].branch.id + '/' + userBranch[j].id);
    //                     response.push(data[i]);
    //                 }
    //             }
    //         } else if (data[i].account) {
    //             // const isExisted = response.filter(element => element.id ===);
    //             if (userBranch[j].id === data[i].account.branch) {
    //                 if (userBranch[j].id === data[i].account.branch.id) {
    //                     // console.log(data[i].branch.id + '/' + userBranch[j].id);
    //                     response.push(data[i]);
    //                 }
    //             }
    //         } else if (data[i].branch) {
    //             // const isExisted = response.filter(element => element.id ===);
    //             if (userBranch[j].id === data[i].branch.id) {
    //                 // console.log(data[i].branch.id + '/' + userBranch[j].id);
    //                 response.push(data[i]);
    //             }
    //         } else {
    //             console.error('getDataByUserBranches No match: ', data[i]);
    //         }
    //     }
    // }
    // return data;
    return null;// response;
  }

  getMainHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': '',
        // 'Bank': '',
        // 'Branch': '',
        'User': ''
      })
    };
  }

  setSelectedUser(selectedUser) {
    this.selectedUserSource.next(selectedUser);
  }

  getSelectedUser(): Observable<any> {
    return this.selectedUserSource.asObservable();
  }

  clearSelectedUser() {
    this.selectedUserSource.next(null);
  }

  private filterBranchByUserBranches(data: any, errorMsg) {
    // const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    // const userBranch: any = currentUser.branchs;
    // const response = [];
    // for (let i = 0; i < data.length; i++) {
    //     for (let j = 0; j < userBranch.length; j++) {
    //         if (data[i].branch) {
    //             if (userBranch[j].id === data[i].branch.id) {
    //                 response.push(data[i]);
    //             }
    //         } else {
    //            if (errorMsg) {
    //               console.error(errorMsg, data[i]);
    //            }  else  {
    //                console.error('filterBranchByUserBranches No match: ', data[i]);
    //            }
    //         }
    //     }
    // }
    // return data;
    return null; //response;
  }

  // getAllEmf():Observable<any>{
  //     return this.http.get<any>(backendUrl.content + 'cbs-emf');
  //   }
}
