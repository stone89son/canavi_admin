import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/auth/http.service';
import { AuthGuard } from './services/auth/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ServerTokenStoreService, BrowserTokenStoreService } from './services/auth/token-store.service';
// blog
import { AttributeValueService } from './services/crawler/attribute-value/crawler.attribute-value.service';
import { AttributeService } from './services/crawler/attribute/crawler.attribute.service';
import { CrawlerAttributeService } from './services/crawler/crawler-attribute/crawler-attribute.service';
import { JobService } from './services/crawler/job/crawler.job.service';
import { WebsiteService } from './services/crawler/website/crawler.website.service';
import { HttpClientService } from './common/http-client.service';
import { CanaviAttributeService } from './services/canavi/attribute/canavi.attribute.service';
import { RecuiterService } from './services/crawler/recuiter/crawler.recuiter.service';
import { JobStatusGroupService } from './services/canavi/jobs/system.job-status-group.service';
import { JobStatusService } from './services/canavi/jobs/job-status.service';
import { JobSubStatusService } from './services/canavi/jobs/job-sub-status.service';
import { CanaviRecuiterService } from './services/canavi/recuiter/canavi.recuiter.service';
import { CanaviAttributeValueService } from './services/canavi/attribute-value/canavi-attribute-value-service';
import { CanaviJobService } from './services/canavi/jobs/canavi-job-service';
import { FileService } from './services/upload/file.service';
import { CanaviAttributeGroupService } from './services/canavi/attribute-group/canavi-attribute-group-service';
import { CrawlerMappingAttributeService } from './services/crawler/mapping-attribute/crawler.mapping-attribute-service';
import { CanaviAttributeRelationshipService } from './services/canavi/attribute-relationship/canavi-attribute-relationship-service';
import { CanaviSearchHistoryService } from './services/canavi/search-history/canavi-search-history-service';
import { CanaviAttributeFilterMappingService } from './services/canavi/attribute-filter-mapping/attribute-filter-mapping-service';
import { RoleService } from './services/canavi/role/role.service';
import { CustomerService } from './services/canavi/customer/customer.service';
import { EmailOrSmsService } from './services/marketing/email-or-sms/email-or-sms.service';
import { BlogCategoryService } from './services/blog/blog-category.service';
import { BlogPostService } from './services/blog/blog-post.service';
import { BlogTagsService } from './services/blog/blog-tags.service';
import { BlogAuthorsService } from './services/blog/blog-authors.service';
import { CanaviRecuiterUserMappingService } from './services/canavi/recuiter/canavi-recuiter-user-mapping.service';
import { CanaviRecuiterPaymentHistoryService } from './services/canavi/recuiter/canavi-recuiter-payment-history.service';
import { CanaviRecuiterExternalProfileService } from './services/canavi/recuiter/canavi-recuiter-external-profile.service';
import { CandidatePaymentRequestService } from './services/canavi/candidate/candidate-payment-request-service';
import { CandidateJobMappingService } from './services/canavi/candidate/candidate-job-mapping-service';
import { CanaviCandidateService } from './services/canavi/candidate/canavi-candidate-service';
import { BlogQuestionsService } from './services/blog/blog-questions.service';
import { BlogAnswersService } from './services/blog/blog-answers.service';
import { SeoDetailService } from './services/marketing/seo-detail/seo-detail.service';
import { BannerService } from './services/marketing/banner/banner.service';
import { CanaviCommisstionFeeService } from './services/canavi/commisstion-fee/comisstion-fee-service';
import { ComponentGroupService } from './services/canavi/component-group/component-group-service';
import { ComponentAttributeConfigService } from './services/canavi/component-group/component-attribute-config-service';
import { ComponentBlogPostConfigService } from './services/canavi/component-group/component-blog-post-config-service';
import { ComponentKeywordConfigService } from './services/canavi/component-group/component-keyword-config-service';
import { ComponentRecuiterConfigService } from './services/canavi/component-group/component-recuiter-config-service';
import { BlogWikiService } from './services/blog/blog-wiki.service';
import { SlugifyPipe } from 'src/app/common/slugify-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterGroupService } from './services/canavi/footer/footer-group.service';
import { ExcelService } from './services/export-excel/export-excel.service';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonService } from './services/common/common.service';
import { AuthenticationRecruiterSevice } from './services/canavi/authentication-recruiter/authentication-recruiter.service';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogOverviewExampleDialog} from 'src/app/components/marketing/banner/banner.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { CampaignjobserviceService } from './services/canavi/campaign-job/campaignjobservice.service';




export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [AppComponent,DialogOverviewExampleDialog],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpService,
    HttpClientService,
    DatePipe,
    AuthGuard,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, 
      useValue: MY_FORMATS
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: OAuthStorage,
      useClass: ServerTokenStoreService
    },
    {
      provide: OAuthStorage,
      useClass: BrowserTokenStoreService
    },
    {
      provide: "BASE_URL",
      useFactory: getBaseUrl
    },
    CampaignjobserviceService,
    AttributeValueService,
    AttributeService,
    CrawlerAttributeService,
    JobService,
    WebsiteService,
    CanaviAttributeService,
    RecuiterService,
    JobStatusGroupService,
    JobStatusService,
    JobSubStatusService,
    CanaviRecuiterService,
    CanaviAttributeValueService,
    CanaviJobService,
    FileService,
    CanaviAttributeGroupService,
    CrawlerMappingAttributeService,
    CanaviAttributeRelationshipService,
    CanaviSearchHistoryService,
    CanaviAttributeFilterMappingService,
    CanaviCommisstionFeeService,
    CustomerService,
    RoleService,
    EmailOrSmsService,
    BlogCategoryService,
    BlogPostService,
    BlogTagsService,
    BlogAuthorsService,
    CanaviRecuiterUserMappingService,
    CanaviRecuiterPaymentHistoryService,
    CanaviRecuiterExternalProfileService,
    CandidatePaymentRequestService,
    CandidateJobMappingService,
    CanaviCandidateService,
    BlogQuestionsService,
    BlogAnswersService,
    SeoDetailService,
    BannerService,
    ComponentGroupService,
    ComponentAttributeConfigService,
    ComponentBlogPostConfigService,
    ComponentKeywordConfigService,
    ComponentRecuiterConfigService,
    AuthenticationRecruiterSevice,
    BlogWikiService,
    SlugifyPipe,
    FooterGroupService,
    ExcelService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
