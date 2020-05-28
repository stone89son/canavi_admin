import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { BannerItemAddOrChangeComponent } from "../banner-item-add-or-change/banner-item-add-or-change.component";
import { BannerItemSearchRequest } from "src/app/models/marketing/banner-item/banner-item-search-request";
import { Banner } from "src/app/models/marketing/banner/banner";
import { KeyValueModel } from "src/app/models/upload/result-model";
import { BannerItem } from "src/app/models/marketing/banner-item/banner-item";
import { BannerService } from "src/app/services/marketing/banner/banner.service";
import { ConfigSetting } from "src/app/common/configSetting";

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: "app-banner-item",
  templateUrl: "./banner-item.component.html",
  styleUrls: ["./banner-item.component.css"]
})
export class BannerItemComponent implements OnInit {
  @ViewChild(BannerItemAddOrChangeComponent, { static: false })
  bannerItemAddOrChange: BannerItemAddOrChangeComponent;
  @ViewChild("searchForm", { static: false }) searchForm: any;
  searchParams: BannerItemSearchRequest;
  banner: Banner;
  statuses: KeyValueModel[];
  currentBannerId: string;
  bannerItems: BannerItem[];
  currentBannerItemId: string;
  totalRow = 0;
  onDeleteStatus: boolean;
  constructor(
    private bannerService: BannerService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    if (jQuery().datepicker) {
      $(".date-picker").datepicker({
        rtl: App.isRTL(),
        orientation: "left",
        autoclose: true
      });
      // $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    }
    this.searchParams = new BannerItemSearchRequest();
    this.searchParams.status = 0;
    this.searchParams.pageIndex = 0;
    this.searchParams.pageSize = 30;
    this.statuses = [];
    this.banner = new Banner();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.currentBannerId = param.get("bannerId");
    });
    this.searchParams.bannerId = this.currentBannerId;
    this.getBannerItems();
  }

  async getBannerItems(): Promise<void> {
    try {
      this.searchParams.fromStartDate = $("input[name='fromStartDate']").val();
      this.searchParams.toStartDate = $("input[name='toStartDate']").val();
      this.searchParams.fromEndDate = $("input[name='fromEndDate']").val();
      this.searchParams.toEndDate = $("input[name='toEndDate']").val();
      const response = await this.bannerService.searchBannerItem(
        this.searchParams
      );
      this.statuses = response.statuses;
      this.bannerItems = response.bannerItems;
      this.banner = response.banner;
      this.totalRow = response.totalRow;
      if (this.banner.id == null || this.banner.id === "") {
        ConfigSetting.ShowError("Banner not found!!!");
      }
    } 
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      this.currentBannerItemId = id;
      this.bannerItemAddOrChange.resetForm();

      this.bannerItemAddOrChange.bannerItemId = id;
      this.bannerItemAddOrChange.bannerId = this.currentBannerId;
      const result = await this.bannerItemAddOrChange.onGetDetail();
      if (result) {
        $("#banner-item-add-or-change").modal("show");
      }
    } 
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  public onRegisterConfirmation() {
    const obj = $(".banneritem_remove_bs_confirmation");
    const register = obj.attr("confirmation_register");
    if (register === "1") {
      return;
    }
    obj.attr("confirmation_register", "1");
    obj.confirmation({
      rootSelector: "[data-toggle=confirmation]"
    });
    const $that = this;
    obj.on("confirmed.bs.confirmation", function() {
      console.log(this);
      const id = $(this).attr("tmpid");
      $that.onDelete(id);
    });
  }

  async onDelete(id: string): Promise<void> {
    if (this.onDeleteStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onDeleteStatus = true;
    try {
      const response = await this.bannerService.removeBannerItem(
        id,
        this.currentBannerId
      );
      if (response.status) {
        ConfigSetting.ShowSuccess("Lưu thành công.");
        this.getBannerItems();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onDeleteStatus = false;
    App.unblockUI();
  }

  async onShowImage(url: string): Promise<void> {
    var urlWindow = url;
    window.open(urlWindow);
  }
}
