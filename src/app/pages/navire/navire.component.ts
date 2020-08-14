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
import {NavireService} from '../../shared/services/navire.service';
import {Navire} from '../../shared/models/navire.model';
import {first} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ExcelService} from '../../shared/services/excel.service';
import {AuthenticationService} from '../../shared/services/auth.service';
import {Title} from '@angular/platform-browser';
import {PageTitleService} from '../../shared/services/page-title.service';

@Component({
  selector: 'app-navire',
  templateUrl: './navire.component.html',
  styleUrls: ['./navire.component.scss']
})
export class NavireComponent implements OnInit, OnDestroy {

  action = new Subject();
  EditMode = false;
  gt = new Subject();

  identify: any;

  faUser = faUser;
  faEdit = faEdit;
  faNavirePlus = faUserPlus;
  faFileExcel = faFileExcel;
  faHome = faHome;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faPlusCircle = faPlusCircle;
  faEllipsisH = faEllipsisH;

  navireForm: FormGroup;
  isLoading: boolean;

  navires: any = [];
  exportNavire = [];
  navire: any;
  subTitle = 'Navires';
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
          name: 'editNavire',
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
        title: 'Code',
      },
      libelle: {
        title: 'Libelle',
      }
    },
  };


  navireSource: LocalDataSource;

  // isActive = false;

  constructor(
    private  navireService: NavireService,
    private titleService: Title,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private pageTitleService: PageTitleService,
    private fb: FormBuilder,
    private excelService: ExcelService) {
    this.pageTitleService.changeMessage('Gestion des ' + this.subTitle);
    this.navireSource = new LocalDataSource();
    this.navireForm = this.fb.group({
      code: ['', Validators.required],
      libelle: ''
    });
  }

  get f() {
    return this.navireForm.controls;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(
      this.exportNavire,
      'Liste des Navires'
    );
  }

  onCustom(event) {
    // console.log('row', event.data);
    this.navireForm.patchValue(event.data);
    this.identify = event.data.identify;
  }

  resetForm() {
    this.navireForm.reset();
    this.identify = null;
  }

  onSubmit() {
    this.submitted = true;
    this.toastr.info('Opération en cours...', 'Veillez patienter');
    // console.log(this.navireForm.value);
    if (this.navireForm.invalid) {
      this.toastr.error('Entrée invalide');
      return;
    }
    const navire: any = new Navire(
      this.navireForm.get('code').value,
      this.navireForm.get('libelle').value
    );

    this.isLoading = true;
    this.submitNavire(navire, this.identify);
  }

  submitNavire(navire, identify) {
    if (identify == null) {
      this.navireService.create(navire)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('klkl', data)
            // console.log(data);
            this.toastr.success('Navire créé avec succès', 'Succès');
            this.isLoading = false;
            this.navireForm.reset();
            this.action.next(this.loadNavires());
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
      navire.identify = identify;
      // console.log('navireRquest', navire);
      this.navireService.update(navire)
        .pipe(first())
        .subscribe(
          data => {
            // console.log('output', data);
            this.navireService.setSelectedNavire(data);
            this.toastr.success('Navire mis à jour avec succès', 'Succès');
            this.isLoading = false;
            this.navireForm.reset();
            this.action.next(this.loadNavires());
          },
          error => {
            this.isLoading = false;
            console.log(error);
            this.toastr.error('erreur');
            this.action.next('no');
          });
    }
  }

  loadNavires() {
    this.navireService.getAllNavires().subscribe(
      navires => {
        const em = [];
        navires.forEach(element => {
          em.push({
            identify: element.identify,
            code: element.code,
            libelle: element.libelle
          });
        });
        this.exportNavire = em;
        this.navireSource.setPaging(1, this.pageSize, true);
        this.navireSource.load(em);
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
    this.loadNavires();
  }

  ngOnDestroy() {
    if (this.identify != null) {
      this.navireService.setSelectedNavire(null);
    }
  }

}
