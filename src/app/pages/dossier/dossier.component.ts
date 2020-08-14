import {
  faEdit,
  faEllipsisH,
  faFileExcel,
  faHome,
  faPaperPlane,
  faPlusCircle,
  faTimes,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ExcelService} from '../../shared/services/excel.service';
import {AuthenticationService} from '../../shared/services/auth.service';
import {Title} from '@angular/platform-browser';
import {Dossier} from '../../shared/models/dossier.model';
import {Client, ClientId} from '../../shared/models/client.model';
import {PersonnalId} from '../../shared/models/personnal.model';
import {DossierService} from '../../shared/services/dossier.service';
import {PageTitleService} from '../../shared/services/page-title.service';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit, OnDestroy {

  action = new Subject();
  EditMode = false;
  gt = new Subject();

  identify: any;
  client: ClientId;
  personnalByExpediteur: PersonnalId;
  personnalByDestinataire: PersonnalId;

  faUser = faUser;
  faEdit = faEdit;
  faDossierPlus = faUserPlus;
  faFileExcel = faFileExcel;
  faHome = faHome;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faPlusCircle = faPlusCircle;
  faEllipsisH = faEllipsisH;

  dossierForm: FormGroup;
  isLoading: boolean;

  dossiers: any = [];
  exportDossier = [];
  dossier: any;
  subTitle = 'Dossiers';
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
          name: 'editDossier',
          // tslint:disable-next-line:max-line-length
          title: '<span class="edit-data"><img src="../../../assets/images/edit.png" alt="" srcset=""></span>'
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    // hideSubHeader: true,
    columns: {
      code: {
        title: 'N° Dossier',
      },
      firstName: {
        title: 'Client',
      }
    },
  };


  dossierSource: LocalDataSource;

  // isActive = false;

  constructor(
    private  dossierService: DossierService,
    private titleService: Title,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private pageTitleService: PageTitleService,
    private excelService: ExcelService) {
    this.pageTitleService.changeMessage('Gestion des ' + this.subTitle);
    this.dossierSource = new LocalDataSource();
    this.dossierForm = this.fb.group({
      dateMiseEnPlace: [new Date(), Validators.required],
      numeroDossier: ['', Validators.required],
      repertoire: ['', Validators.required],
      client: ['', Validators.required],
      personnalByExpediteur: ['', Validators.required],
      personnalByDestinataire: ['', Validators.required],
      numeroTarifaire: ['', Validators.required],
      montantDeclare: ['', Validators.required],
      bureau: ['', Validators.required],
      regime: ['', Validators.required],
      dateDeclaration: ['', Validators.required],
      numeroDeclaration: ['', Validators.required],
      montantTaxe: ['', Validators.required],
      observation: ['', Validators.required]
    });
  }

  get f() {
    return this.dossierForm.controls;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.exportDossier,
      'Liste des Dossiers'
    );
  }

  onCustom(event) {
    // console.log('row', event.data);
    this.dossierForm.patchValue(event.data);
    this.identify = event.data.identify;
  }

  resetForm() {
    this.dossierForm.reset();
    this.identify = null;
  }

  onSubmit() {
    this.submitted = true;
    this.toastr.info('Opération en cours...', 'Veillez patienter');
    // console.log(this.dossierForm.value);
    if (this.dossierForm.invalid) {
      this.toastr.error('Entrée invalide');
      return;
    }

    const dossier: any = new Dossier(
      this.client,
      this.personnalByExpediteur,
      this.personnalByDestinataire,
      this.dossierForm.get('numeroDossier').value,
      this.dossierForm.get('dateMiseEnPlace').value,
      this.dossierForm.get('repertoire').value,
      this.dossierForm.get('category').value,
      this.dossierForm.get('numeroTarifaire').value,
      this.dossierForm.get('montantDeclare').value,
      this.dossierForm.get('bureau').value,
      this.dossierForm.get('regime').value,
      this.dossierForm.get('numeroDeclaration').value,
      this.dossierForm.get('dateDeclaration').value,
      this.dossierForm.get('montantTaxe').value,
      this.dossierForm.get('observation').value
    );

    this.isLoading = true;
    this.submitDossier(dossier, this.identify);
  }

  submitDossier(dossier, identify) {
    if (identify == null) {
      this.dossierService.create(dossier)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('klkl', data)
            // console.log(data);
            this.toastr.success('Dossier créé avec succès', 'Succès');
            this.isLoading = false;
            this.dossierForm.reset();
            this.action.next(this.loadDossiers());
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
      dossier.identify = identify;
      // console.log('dossierRquest', dossier);
      this.dossierService.update(dossier)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('output', data);
            this.dossierService.setSelectedDossier(data);
            this.toastr.success('Dossier mis à jour avec succès', 'Succès');
            this.isLoading = false;
            this.dossierForm.reset();
            this.action.next(this.loadDossiers());
          },
          error => {
            this.isLoading = false;
            console.log(error);
            this.toastr.error('erreur');
            this.action.next('no');
          });
    }
  }

  loadDossiers() {
    this.dossierService.getAllDossiers().subscribe(
      dossiers => {
        const em = [];
        dossiers.forEach(element => {
          em.push({
            identify: element.identify,
            code: element.code,
            libelle: element.libelle
          });
        });
        this.exportDossier = em;
        this.dossierSource.setPaging(1, this.pageSize, true);
        this.dossierSource.load(em);
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
    this.loadDossiers();
  }

  ngOnDestroy() {
    if (this.identify != null) {
      this.dossierService.setSelectedDossier(null);
    }
  }

}
