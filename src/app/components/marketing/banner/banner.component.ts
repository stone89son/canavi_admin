import { Component, OnInit, Inject, ViewChild,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BannerAddOrChangeComponent } from '../banner-add-or-change/banner-add-or-change.component';
import { BannerSearchRequest } from 'src/app/models/marketing/banner/banner-search-request';
import { KeyValueModel } from 'src/app/models/upload/result-model';
import { Banner } from 'src/app/models/marketing/banner/banner';
import { BannerService } from 'src/app/services/marketing/banner/banner.service';
import { ConfigSetting } from 'src/app/common/configSetting';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BannerItemGrid } from 'src/app/models/marketing/banner/banner-item-grid';
import { BannerItemSearchRequest } from 'src/app/models/marketing/banner-item/banner-item-search-request';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BannerItem } from "src/app/models/marketing/banner-item/banner-item";
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import {MatInputModule} from '@angular/material/input';
import { FileService } from 'src/app/services/upload/file.service';

export interface DialogData {
  idBanner: string;
  idBannerItem: string;
}

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild(BannerAddOrChangeComponent, { static: false }) bannerAddOrChange: BannerAddOrChangeComponent;
  @ViewChild('searchForm', { static: false }) form: any;
  searchParams: BannerSearchRequest;
  statuses: KeyValueModel[];
  banners: Banner[];
  currentBannerId: string;
  totalRow = 0;
  getBannersStatus: boolean;
  onDeleteStatus: boolean;

  //thuoc tinh moi
  //@ViewChild(FileUploadComponent, {static: false}) fileUpload: FileUploadComponent;
  ELEMENT_DATA: BannerItemGrid[];
  displayedColumns: string[] = ['position', 'screenName', 'bannerName', 'status', 'imageLink', 'cta', 'action'];
  dataSource = new MatTableDataSource<BannerItemGrid>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(FileUploadComponent, {static: false}) fileUpload : FileUploadComponent;


  constructor(
    private bannerService: BannerService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.searchParams = new BannerSearchRequest();
    this.searchParams.status = 0;
    this.searchParams.pageIndex = 0;
    this.searchParams.pageSize = 30;
    this.getBannersStatus = false;
    this.onDeleteStatus = false;
    this.statuses = [];
    this.getBanners();
    //them moi
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //get data from API
    this.GetAllBannerItem();
  }

  async GetAllBannerItem() {
    let request = new BannerItemSearchRequest();

    const response = await this.bannerService.getAllBannerItem(request);
    if (response.status) {

      response.bannerItems.forEach(function (value) {
        if (value.imageLink.startsWith('/')) {
          value.imageLink = 'https://cdn.canavi.com' + value.imageLink;
        }
      });

      this.dataSource = new MatTableDataSource<BannerItemGrid>(response.bannerItems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async onShowImage(url: string): Promise<void> {
    var urlWindow = url;
    window.open(urlWindow);
  };

  async ShowDialogChangBannerItem(idBanner: string, idBannerItem: string) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      data: { idBanner: idBanner, idBannerItem: idBannerItem }
    });
  }

  //phan cu
  async getBanners(): Promise<void> {
    if (this.getBannersStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.getBannersStatus = true;
    try {
      const response = await this.bannerService.searchBanner(this.searchParams);
      this.statuses = response.statuses;
      this.banners = response.banners;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.getBannersStatus = false;
    App.unblockUI();
  }
  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      this.currentBannerId = id;
      this.bannerAddOrChange.banner.id = id;
      this.bannerAddOrChange.onGetDetail();
      $('#banner-add-or-change').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onDelete(id: string): Promise<void> {
    if (this.onDeleteStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onDeleteStatus = true;
    try {
      const response = await this.bannerService.removeBanner(id);
      if (response.status) {
        ConfigSetting.ShowSuccess('Lưu thành công.');
        this.getBanners();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onDeleteStatus = false;
    App.unblockUI();
  }
  public onRegisterConfirmation() {
    const obj = $('.banner_remove_bs_confirmation');
    const register = obj.attr('confirmation_register');
    if (register === '1') {
      return;
    }
    obj.attr('confirmation_register', '1');
    obj.confirmation({
      rootSelector: '[data-toggle=confirmation]'
    });
    const $that = this;
    obj.on('confirmed.bs.confirmation', function () {
      console.log(this);
      const id = $(this).attr('tmpid');
      $that.onDelete(id);
    });
  }
}



@Component({
  selector: 'dialogEditBannerItem',
  templateUrl: 'dialogEditBannerItem.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  //of upload file
  errors: Array<string> = [];
  dragAreaClass = 'dragarea';
  //
  banners: Banner[];
  searchParams: BannerSearchRequest;
  bannerItemSearchParams: BannerItemSearchRequest;
  //of upload file
  fileExt: string;
  maxFiles: number;
  maxSize: number; // 5MB
  imageUrl: string;
  imagePath: string;

  @ViewChild(FileUploadComponent, {static: false}) fileUpload : FileUploadComponent;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private bannerService: BannerService,
    private fileService: FileService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.getBanners();
    //of upload file
    this.fileExt = 'JPG, GIF, PNG';
    this.maxFiles = 100;
    this.maxSize = 100; // 5MB
    this.imageUrl = this.bannerItem.imageUrl;
    this.imagePath = this.bannerItem.imageUrl;
    if(this.data.idBanner!='' && this.data.idBannerItem!=''){
      this.isDislayContentChangeBanner = true;
    }
  }
  isLeo:number;
  isDislayContentChangeBanner: boolean = false;
  bannerItems: BannerItem[];
  bannerItem: BannerItem=new BannerItem();
  async getBanners(): Promise<void> {
    try {
      this.searchParams = new BannerSearchRequest();
      this.searchParams.status = 0;
      this.searchParams.pageIndex = 0;
      this.searchParams.pageSize = 30;
      const response = await this.bannerService.searchBanner(this.searchParams);
      this.banners = response.banners;
      this.initBannerItemByIdBannner();
      this.bannerItem.status
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  someMethod() {
    console.log(this.data.idBanner);
    this.initBannerItemByIdBannner();
    this.isDislayContentChangeBanner = false;
  }
  someMethodBannerItem(){
    this.GetDetailBannerItem();
    this.isDislayContentChangeBanner=true;
  }

  async changBannerItem(){
    

    try {
        this.bannerItem.imageUrl = this.imageUrl;
        const requestModel = this.bannerItem;
        const response = await this.bannerService.saveBannerItem(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess('Lưu thành công.');
        } 
        else
        {
          ConfigSetting.ShowErrores(response.messages);
        }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
    }
    


  }
  async initBannerItemByIdBannner() {
    if(this.data.idBanner!=''){
      this.bannerItemSearchParams = new BannerItemSearchRequest();
      this.bannerItemSearchParams.bannerId = this.data.idBanner;
      this.bannerItemSearchParams.status = 0;
      this.bannerItemSearchParams.pageIndex = 0;
      this.bannerItemSearchParams.pageSize = 30;
      const response = await this.bannerService.searchBannerItem(
        this.bannerItemSearchParams
      );
      this.bannerItems = response.bannerItems;
      if(this.data.idBannerItem != ''){
        this.GetDetailBannerItem();
      }
    }
  }
  async GetDetailBannerItem(){
    try {
      const response = await this.bannerService.getBannerItemById(this.data.idBannerItem, this.data.idBanner);
      if (response.status) {
        this.bannerItem = response.bannerItem;
        if(this.bannerItem.imageUrl.startsWith('/')){
          this.bannerItem.imageUrl='https://cdn.canavi.com'+this.bannerItem.imageUrl;
        }
        this.fileExt = 'JPG, GIF, PNG';
        this.maxFiles = 100;
        this.maxSize = 100; // 5MB
        this.imageUrl = this.bannerItem.imageUrl;
        this.imagePath = this.bannerItem.imageUrl;
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }


//of upload file
  onFileChange(event) {
    const files = event.target.files;
    this.saveFiles(files);
  }
  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.saveFiles(files);
  }
  async saveFiles(files): Promise<void> {
    
    this.errors = [];
    if (files.length > 0 && (!this.isValidFiles(files))) {
      return;
    }
    if (files.length > 0) {
      const file = files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
      const response = await this.fileService.upload(formData);
      // const responseObject = JSON.stringify(response) as FileUploadResponseModel;
        this.imageUrl = response.fullUrl;
        this.imagePath = response.path + '/' + response.name;
    }
  }
  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }
  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim(); });
    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push('Error (Extension): ' + files[i].name);
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }
  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
    }
  }
  public get getImageUrl() {
    return this.imageUrl;
  }
  public get getImagePath() {
    return this.imagePath;
  }


}