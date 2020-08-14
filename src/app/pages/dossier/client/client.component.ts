import {
  faEdit,
  faEllipsisH,
  faFileExcel,
  faHome,
  faMinusCircle,
  faPaperPlane,
  faPlusCircle,
  faSearch,
  faTimes,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../../shared/services/client.service';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {PageTitleService} from '../../../shared/services/page-title.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExcelService} from '../../../shared/services/excel.service';
import {LocalDataSource} from 'ng2-smart-table';
import {Client} from '../../../shared/models/client.model';
import {first} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Personnal} from '../../../shared/models/personnal.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  action = new Subject();
  EditMode = false;
  gt = new Subject();

  identify: any;

  faUser = faUser;
  faSearch = faSearch;
  faEdit = faEdit;
  faClientPlus = faUserPlus;
  faFileExcel = faFileExcel;
  faHome = faHome;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faEllipsisH = faEllipsisH;

  clientForm: FormGroup;
  isLoading: boolean;

  clients: any = [];
  exportClient = [];
  client: any;
  subTitle = 'Clients';
  submitted = false;
  // rowSearch = false;
  pageSize = 20;
  settings = {
    attr: {
      class: 'table'
    },
    actions: {
      columnTitle: '',
      custom: [
        {
          name: 'editClient',
          // tslint:disable-next-line:max-line-length
          title: '<span class="edit-data"><img src="../../../../assets/images/edit.png" alt="" srcset=""></span>'
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    // hideSubHeader: true,
    columns: {
      code: {
        title: 'Code',
      },
      firstName: {
        title: 'Nom',
      },
      raisonSociale: {
        title: 'Raison Sociale',
      }
    },
  };


  clientSource: LocalDataSource;

  // isActive = false;
  constructor(
    private  clientService: ClientService,
    private titleService: Title,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private pageTitleService: PageTitleService,
    private fb: FormBuilder,
    private excelService: ExcelService) {
    this.pageTitleService.changeMessage('Gestion des ' + this.subTitle);
    this.clientSource = new LocalDataSource();
    this.clientForm = this.fb.group({
      code: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: '',
      numeroCni: ['', Validators.required],
      numeroContribuable: '',
      telephone: this.fb.array([]),
      // telephones: new FormArray([]),
      // telephones: [{telephone: new FormArray([]), disabled: true},
      //   [Validators.required], ],
      email: '',
      fax: '',
      raisonSociale: ['', Validators.required],
      adresse: '',
      numeroRc: '',
      nature: '',
      'personnal.identify': ''
    });
    this.addTelephone('');
  }

  get getTelephones(): FormArray {
    return this.clientForm.get('telephone') as FormArray;
    // get('telephones') as FormArray;
  }

  get f() {
    return this.clientForm.controls;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.exportClient,
      'Liste des Clients'
    );
  }

  onCustom(event) {
    this.clientForm.patchValue(event.data);
    this.getTelephones.clear();
    this.addTelephones(event.data.telephone);

    this.identify = event.data.identify;
  }

  resetForm() {
    this.submitted = false;
    this.clientForm.reset();
    this.getTelephones.clear();
    this.identify = null;
  }

  newTelephone(value): FormGroup {
    return this.fb.group({
      number: value
    });
  }

  addTelephone(value) {
    this.getTelephones.push(this.newTelephone(value));
  }

  addTelephones(value: Array<string>) {
    value.forEach(e => this.addTelephone(e));
  }

  removeTelephone(i: number) {
    this.getTelephones.removeAt(i);
  }

  onSubmit() {
    this.submitted = true;
    this.toastr.info('Opération en cours...', 'Veillez patienter');
    // console.log(this.clientForm.value);
    if (this.clientForm.controls['code' && 'firstName' && 'numeroCni' && 'raisonSociale'].invalid) {
      this.toastr.error('Entrée invalide');
      return;
    }

    const tel = [];
    (this.clientForm.get('telephone').value as Array<any>).forEach(e =>
      tel.push(e.number)
    );
    const personnal: any = new Personnal(
      this.clientForm.get('code').value,
      this.clientForm.get('firstName').value,
      this.clientForm.get('lastName').value,
      this.clientForm.get('numeroCni').value,
      this.clientForm.get('numeroContribuable').value,
      tel,
      this.clientForm.get('email').value,
      this.clientForm.get('fax').value,
      this.clientForm.value['personnal.identify']);

    console.log('Personne', personnal);
    const client: any = new Client(
      personnal,
      this.clientForm.get('raisonSociale').value,
      this.clientForm.get('adresse').value,
      this.clientForm.get('numeroRc').value,
      this.clientForm.get('nature').value,
    );

    this.isLoading = true;
    this.submitClient(client, this.identify);
  }

  submitClient(client, identify) {
    if (identify == null) {
      this.clientService.create(client)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('klkl', data)
            // console.log(data);
            this.toastr.success('Client créé avec succès', 'Succès');
            this.isLoading = false;
            this.clientForm.reset();
            this.action.next(this.loadClients());
          },
          error => {
            this.isLoading = false;
            console.log(error);
            this.action.next('no');
            if (error.status === 400) {
              this.toastr.error('Informations incorrectes');
              return;
            }
            if (error.status === 0) {
              this.toastr.error('Erreur de connexion internet');
              return;
            }
            if (error.status === 409) {
              this.toastr.error('Conflits d\'informations');
              return;
            }
            this.toastr.error('Erreur Serveur');
          });
    } else {
      client.identify = identify;
      // console.log('clientRquest', client);
      this.clientService.update(client)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('output', data);
            this.clientService.setSelectedClient(data);
            this.toastr.success('Client mis à jour avec succès', 'Succès');
            this.isLoading = false;
            this.clientForm.reset();
            this.action.next(this.loadClients());
          },
          error => {
            this.isLoading = false;
            console.log(error);
            this.toastr.error('erreur');
            this.action.next('no');
          });
    }
  }

  loadClients() {
    this.clientService.getAllClients().subscribe(
      clients => {
        const em = [];
        clients.forEach(element => {
          em.push({
            identify: element.identify,
            code: element.personnal.code,
            firstName: element.personnal.firstName,
            lastName: element.personnal.lastName,
            numeroCni: element.personnal.numeroCni,
            numeroContribuable: element.personnal.numeroContribuable,
            email: element.personnal.email,
            telephone: element.personnal.telephone,
            // telephones: this.newTelephone(element.personnal.telephone[0]),
            // telephones: this.fb.array(this.addTelephones(element.personnal.telephone)),
            // telephones: {
            //   telephone: element.personnal.telephone[0]
            // }, // this.addTelephones(element.personnal.telephone),
            fax: element.personnal.fax,
            raisonSociale: element.raisonSociale,
            numeroRc: element.numeroRc,
            adresse: element.adresse,
            nature: element.nature,
            'personnal.identify': element.personnal.identify
          });
        });
        this.exportClient = em;
        this.clientSource.setPaging(1, this.pageSize, true);
        this.clientSource.load(em);
        setTimeout(() => {
          for (let i = 0; i < this.pageSize; i++) {
            $('.edit-collector').removeClass('edit-c' + i);
            $('.edit-collector').eq(i).addClass('edit-c' + i);
          }
        }, 500);
      },
      err => {
        console.log(err);
      }
    );

  }

  ngOnInit(): void {
    $('.nav-tabs span').click(
      function() {
        $('.nav-tabs span').removeClass('active');
        const className: string = $(this).attr('class') + '-content';
        console.log(className);
        $('.content').removeClass('visibled');
        $('.' + className).addClass('visibled');
        $(this).addClass('active');
      });
    this.loadClients();
  }

  ngOnDestroy() {
    if (this.identify != null) {
      this.clientService.setSelectedClient(null);
    }
  }

  search() {
    // const dialogConfig = new dial// MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    // dialogConfig.id = "modal-component";
    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // // https://material.angular.io/components/dialog/overview
    // const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
