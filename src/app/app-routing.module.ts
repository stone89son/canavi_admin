import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EqualValidator } from './directives/equal-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { FullCalendarModule } from 'ng-fullcalendar';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ng2-ckeditor';
import { FileUploadModule } from 'primeng/fileupload';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { BaseComponent } from './components/base/base.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { AuthGuard } from './services/auth/auth.guard';
import { CallbackComponent } from './components/base/callback/callback.component';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MultipleFileUploadComponent } from './components/multiple-file-upload/multiple-file-upload.component';
import { AttributeComponent } from './components/crawler/attribute/attribute.component';
import { AttributeValueComponent } from './components/crawler/attribute-value/attribute-value.component';
import { JobComponent } from './components/crawler/job/job.component';
import { CrawlerAttributeComponent } from './components/crawler/crawler-attribute/crawler-attribute/crawler-attribute.component';
import { CrawlerAttributeValueComponent } from './components/crawler/crawler-attribute/crawler-attribute-value/crawler-attribute-value.component';
import { CanaviAttributeComponent } from './components/canavi/attribute/canavi.attribute.component';
import { CanaviAttributeAddOrUpdateComponent } from './components/canavi/attribute/attribute-add-or-update/canavi.attribute-add-or-update.component';
import { RecuiterComponent } from './components/crawler/recuiter/recuiter.component';
import { JobStatusGroupComponent } from './components/canavi/job-status-group/job-status-group.component';
import { JobStatusGroupAddOrUpdateComponent } from './components/canavi/job-status-group/job-status-group-add-or-update/job-status-group-add-or-update.component';
import { JobStatusComponent } from './components/canavi/job-status/job-status.component';
import { JobStatusAddOrUpdateComponent } from './components/canavi/job-status/job-status-add-or-update/job-status-add-or-update.component';
import { JobSubStatusComponent } from './components/canavi/job-sub-status/job-sub-status.component';
import { JobSubStatusAddOrUpdateComponent } from './components/canavi/job-sub-status/job-sub-status-add-or-update/job-sub-status-add-or-update.component';
import { CanaviAttributeValueComponent } from './components/canavi/attribute-value/canavi.attribute-value.component';
import { CanaviAttributeValueAddOrUpdateComponent } from './components/canavi/attribute-value/attribute-value-add-or-update/canavi.attribute-value-add-or-update.component';
import { AttributeGroupComponent } from './components/canavi/attribute-group/attribute-group.component';
import { AttributeGroupAddOrUpdateComponent } from './components/canavi/attribute-group/attribute-group-add-or-update/attribute-group-add-or-update.component';
import { AttributeGroupMappingComponent } from './components/canavi/attribute-group-mapping/attribute-group-mapping.component';
import { AttributeGroupMappingAddOrUpdateComponent } from './components/canavi/attribute-group-mapping/attribute-group-mapping-add-or-update/attribute-group-mapping-add-or-update.component';
import { JobDetailComponent } from './components/canavi/job/getDetail/canavi.job-detail.component';
import { RecuiterDetailComponent } from './components/canavi/recuiter/getDetail/canavi.recuiter-detail.component';
import { AttributeRelationshipComponent } from './components/canavi/attribute-relationship/attribute-relationship.component';
import { AttributeRelationshipAddOrUpdateComponent } from './components/canavi/attribute-relationship/attribute-relationship-add-or-update/attribute-relationship-add-or-update.component';
import { SearchHistoryComponent } from './components/canavi/search-history/search-history.component';
import { SearchHistoryAddOrUpdateComponent } from './components/canavi/search-history/search-history-add-or-update/search-history-add-or-update.component';
import { SearchHistoryDetailComponent } from './components/canavi/search-history-detail/search-history-detail.component';
import { AttributeFilterMappingComponent } from './components/canavi/attribute-filter-mapping/attribute-filter-mapping.component';
import { AttributeFilterMappingAddOrUpdateComponent } from './components/canavi/attribute-filter-mapping/attribute-filter-mapping-add-or-update/attribute-filter-mapping-add-or-update.component';
import { CommisstionFeeComponent } from './components/canavi/commisstion-fee/commisstion-fee.component';
import { CommisstionFeeAddOrUpdateComponent } from './components/canavi/commisstion-fee/commisstion-fee-add-or-update/commisstion-fee-add-or-update.component';
import { CustomerComponent } from './components/canavi/customer/customer.component';
import { RoleCustomerComponent } from './components/canavi/role-customer/role-customer.component';
import { ListCustomerComponent } from './components/canavi/role-customer/list-customer.component';
import { DepartmentComponent } from './components/canavi/department/department.component';
import { CustomerDetailComponent } from './components/canavi/customer-detail/customer-detail.component';
import { CustomerAddOrChangeComponent } from './components/canavi/customer-add-or-change/customer-add-or-change.component';
import { RoleComponent } from './components/canavi/role/role.component';
import { EmaiOrSmsDetailComponent } from './components/marketing/emai-or-sms-detail/emai-or-sms-detail.component';
import { EmailOrSmsComponent } from './components/marketing/email-or-sms/email-or-sms.component';
import { EmailOrSmsAddOrChangeComponent } from './components/marketing/email-or-sms-add-or-change/email-or-sms-add-or-change.component';
import { EmailOrSmsVerifyDetailComponent } from './components/marketing/email-or-sms-verify-detail/email-or-sms-verify-detail.component';
import { BlogCategoryComponent } from './components/blog/category/blog-category.component';
import { PostsComponent } from './components/blog/posts/posts.component';
import { PostSearchCategoryComponent } from './components/blog/posts/post-search-category/post-search-category.component';
import { PostAddOrChangeComponent } from './components/blog/posts/post-add-or-change/post-add-or-change.component';
import { PostAddOrChangeGeneralComponent } from './components/blog/posts/post-add-or-change-general/post-add-or-change-general.component';
import { PostContentComponent } from './components/blog/posts/post-add-or-change-general/post-content/post-content.component';
import { PostCategoryTreeComponent } from './components/blog/posts/post-add-or-change-general/post-category-tree/post-category-tree.component';
import { AuthorsComponent } from './components/blog/authors/authors.component';
import { AuthorsAddOrUpdateComponent } from './components/blog/authors/authors-add-or-update/authors-add-or-update.component';
import { TagsComponent } from './components/blog/tags/tags.component';
import { TagsAddOrUpdateComponent } from './components/blog/tags/tags-add-or-update/tags-add-or-update.component';
import { AttributeRelationshipDetailComponent } from './components/canavi/attribute-relationship-detail/attribute-relationship-detail.component';
import { AttributeRelationshipDetailAddOrUpdateComponent } from './components/canavi/attribute-relationship-detail/attribute-relationship-detail-add-or-update/attribute-relationship-detail-add-or-update.component';
import { CanaviRecuiterComponent } from './components/canavi/recuiter/canavi-recuiter.component';
import { CanaviRecuiterJobsComponent } from './components/canavi/recuiter/canavi-recuiter-jobs/canavi-recuiter-jobs.component';
import { CanaviRecuiterDetailComponent } from './components/canavi/recuiter/canavi-recuiter-detail/canavi-recuiter-detail.component';
import { CanaviRecuiterExternalProfileComponent } from './components/canavi/recuiter/canavi-recuiter-external-profile/canavi-recuiter-external-profile.component';
import { CanaviRecuiterPaymentHistoryComponent } from './components/canavi/recuiter/canavi-recuiter-payment-history/canavi-recuiter-payment-history.component';
import { CanaviRecuiterUserMappingComponent } from './components/canavi/recuiter/canavi-recuiter-user-mapping/canavi-recuiter-user-mapping.component';
import { CandidatePaymentRequestComponent } from './components/canavi/candidates/candidate-payment-request/candidate-payment-request.component';
import { CreateClaimCodeComponent } from './components/canavi/recuiter/canavi-recuiter-user-mapping/create-claim-code.component';
import { CanaviCandidateJobMappingComponent } from './components/canavi/recuiter/canavi-recuiter-jobs/canavi-candidate-job-mapping/canavi-candidate-job-mapping.component';
import { CanaviRecuiterJobDetailComponent } from './components/canavi/recuiter/canavi-recuiter-jobs/canavi-recuiter-job-detail/canavi-recuiter-job-detail.component';
import { CandidateListComponent } from './components/canavi/candidates/candidate-list/candidate-list.component';
import { QuestionsComponent } from './components/blog/questions/questions.component';
import { QuestionsAddOrUpdateComponent } from './components/blog/questions/questions-add-or-update/questions-add-or-update.component';
import { AnswersComponent } from './components/blog/answers/answers.component';
import { AnswersAddOrUpdateComponent } from './components/blog/answers/answers-add-or-update/answers-add-or-update.component';
import { SeoDetailComponent } from './components/marketing/seo-detail/seo-detail.component';
import { SeoDetailAddOrUpdateComponent } from './components/marketing/seo-detail/seo-detail-add-or-update/seo-detail-add-or-update.component';
import { BannerComponent } from './components/marketing/banner/banner.component';
import { BannerItemComponent } from './components/marketing/banner-item/banner-item.component';
import { BannerAddOrChangeComponent } from './components/marketing/banner-add-or-change/banner-add-or-change.component';
import { BannerItemAddOrChangeComponent } from './components/marketing/banner-item-add-or-change/banner-item-add-or-change.component';
import { ComponentGroupComponent } from './components/canavi/component-group/component-group.component';
import { ComponentGroupAddOrUpdateComponent } from './components/canavi/component-group/component-group-add-or-update/component-group-add-or-update.component';
import { ComponentAttributeConfigComponent } from './components/canavi/component-attribute-config/component-attribute-config.component';
import { ComponentAttributeConfigAddOrUpdateComponent } from './components/canavi/component-attribute-config/component-attribute-config-add-or-update/component-attribute-config-add-or-update.component';
import { ComponentBlogPostConfigComponent } from './components/canavi/component-blog-post-config/component-blog-post-config.component';
import { ComponentBlogPostConfigAddOrUpdateComponent } from './components/canavi/component-blog-post-config/component-blog-post-config-add-or-update/component-blog-post-config-add-or-update.component';
import { ComponentKeywordConfigComponent } from './components/canavi/component-keyword-config/component-keyword-config.component';
import { ComponentKeywordConfigAddOrUpdateComponent } from './components/canavi/component-keyword-config/component-keyword-config-add-or-update/component-keyword-config-add-or-update.component';
import { ComponentRecuiterConfigComponent } from './components/canavi/component-recuiter-config/component-recuiter-config.component';
import { ComponentRecuiterConfigAddOrUpdateComponent } from './components/canavi/component-recuiter-config/component-recuiter-config-add-or-update/component-recuiter-config-add-or-update.component';
import { WikiComponent } from './components/blog/wiki/wiki.component';
import { WikiAddOrUpdateComponent } from './components/blog/wiki/wiki-add-or-update/wiki-add-or-update.component';
import { PostSeoComponent } from './components/blog/posts/post-add-or-change-general/post-seo/post-seo.component';
import { FooterGroupComponent } from './components/canavi/dynamic-footer/footer-group/footergroup.component';
import { FooterGroupAddOrChangeComponent } from './components/canavi/dynamic-footer/footer-group-add-or-change-modal/footer-group-add-or-change-modal.component';
import { FooterGroupItemComponent } from './components/canavi/dynamic-footer/footer-group-item/footer-group-item.component';
import { FooterGroupItemAddOrChangeComponent } from './components/canavi/dynamic-footer/footer-group-item-add-or-change-modal/footer-group-item-add-or-change-modal.component';
import { ConfigFooterGroupComponent } from './components/canavi/dynamic-footer/config-footer-group/config-footer-group.component';
import { ExportReportComponent } from './components/canavi/export-report/export-report.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule, MatButtonModule } from "@angular/material";
import { AppAuthenticationRecruiterComponent } from './components/canavi/AuthenticationRecruiter/authentication-Recruiter.component';
import { ManageRecruiterComponent } from './components/canavi/manage-recruiter/manage-recruiter.component';
import { ManageJobComponent } from './components/canavi/manage-job/manage-job.component';
import {MatDialogModule} from "@angular/material";
import { StatusRecruiterDialogComponent } from './components/canavi/recuiter/status-recruiter-dialog/status-recruiter-dialog.component';
import { JobCampaignComponent } from './components/canavi/job-campaign/job-campaign.component';
import { JobComponentAddComponent } from './components/canavi/job-campaign/job-component-add/job-component-add.component';
import { CompanyAutocompleteComponent } from './components/canavi/job-campaign/company-autocomplete/company-autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { ListJobOfCompanyComponent } from './components/canavi/job-campaign/list-job-of-company/list-job-of-company.component';
import { JobForAddComponent } from './components/canavi/job-campaign/job-for-add/job-for-add.component';
import { CandidatesApplyJobComponent } from './components/canavi/job-campaign/candidates-apply-job/candidates-apply-job.component';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';


const routesConfig: Routes = [
  {
    path: '',
    component: CallbackComponent,
    pathMatch: 'full'
  },
  {
    path: 'g',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'attribute',
        component: AttributeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'job',
        component: JobComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'recuiter',
        component: RecuiterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'crawler-attribute',
        component: CrawlerAttributeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'jobstatusgroup',
        component: JobStatusGroupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'jobstatus/:jobstatusgroupId',
        component: JobStatusComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'jobsubstatus/:jobstatusId',
        component: JobSubStatusComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute',
        component: CanaviAttributeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute-value/:attributeId',
        component: CanaviAttributeValueComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute-group',
        component: AttributeGroupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute-group-mapping/:attributeGroupId',
        component: AttributeGroupMappingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute-relationship',
        component: AttributeRelationshipComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute-relationship/:id',
        component: AttributeRelationshipDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-search-history',
        component: SearchHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-search-history-detail/:keyword',
        component: SearchHistoryDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-attribute-filter',
        component: AttributeFilterMappingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-commisstion-fee',
        component: CommisstionFeeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'DetailCustomer/:id',
        component: CustomerDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'role-customer/:roleid/:departmentId',
        component: RoleCustomerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'roles/:departmentid/:customerid',
        component: RoleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'email-or-sms',
        component: EmailOrSmsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'DetailEmailSms/:id',
        component: EmaiOrSmsDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'VerifyDetailEmailSms/:id',
        component: EmailOrSmsVerifyDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-category',
        component: BlogCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-posts',
        component: PostsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-posts/search-category',
        component: PostSearchCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-posts/search-category/:module',
        component: PostSearchCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-posts/add/:categoryId',
        component: PostAddOrChangeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-posts/:id',
        component: PostAddOrChangeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-authors',
        component: AuthorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-tags',
        component: TagsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-recuiters',
        component: CanaviRecuiterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'canavi-candidate-payment-request',
        component: CandidatePaymentRequestComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'canavi-claim-request',
      //   component: CanaviRecuiterUserMappingComponent,
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'canavi-candidate-list',
        component: CandidateListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-questions',
        component: QuestionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-answers/:questionId',
        component: AnswersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'seo-detail',
        component: SeoDetailComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'banner',
        component: BannerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'banner-item/:bannerId',
        component: BannerItemComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'component-group',
        component: ComponentGroupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'component-attribute-config/:componentGroupId',
        component: ComponentAttributeConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'component-blog-post-config/:componentGroupId',
        component: ComponentBlogPostConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'component-keyword-config/:componentGroupId',
        component: ComponentKeywordConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'component-recuiter-config/:componentGroupId',
        component: ComponentRecuiterConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blog-wikis',
        component: WikiComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'footer-group',
        component: FooterGroupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'export-report',
        component: ExportReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'authentication-recruiter',
        component: AppAuthenticationRecruiterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-recruiter',
        component: ManageRecruiterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-job',
        component: ManageJobComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'job-campaign',
        component: JobCampaignComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', component: HomeComponent },

];
@NgModule({
  declarations: [
    CandidatesApplyJobComponent,
    JobForAddComponent,
    CompanyAutocompleteComponent,
    JobComponentAddComponent,
    JobCampaignComponent,
    StatusRecruiterDialogComponent,
    EqualValidator,
    HrefPreventDefaultDirective,
    BaseComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    FileUploadComponent,
    MultipleFileUploadComponent,
    AttributeComponent,
    AttributeValueComponent,
    JobComponent,
    CrawlerAttributeComponent,
    CrawlerAttributeValueComponent,
    CanaviAttributeComponent,
    CanaviAttributeAddOrUpdateComponent,
    RecuiterComponent,
    CallbackComponent,
    JobStatusGroupComponent,
    JobStatusGroupAddOrUpdateComponent,
    JobStatusComponent,
    JobStatusAddOrUpdateComponent,
    JobSubStatusComponent,
    JobSubStatusAddOrUpdateComponent,
    CanaviAttributeValueComponent,
    CanaviAttributeValueAddOrUpdateComponent,
    AttributeGroupComponent,
    AttributeGroupAddOrUpdateComponent,
    AttributeGroupMappingComponent,
    AttributeGroupMappingAddOrUpdateComponent,
    JobDetailComponent,
    RecuiterDetailComponent,
    AttributeRelationshipComponent,
    AttributeRelationshipAddOrUpdateComponent,
    SearchHistoryComponent,
    SearchHistoryAddOrUpdateComponent,
    SearchHistoryDetailComponent,
    AttributeFilterMappingComponent,
    AttributeFilterMappingAddOrUpdateComponent,
    CommisstionFeeComponent,
    CommisstionFeeAddOrUpdateComponent,
    CustomerComponent,
    CustomerAddOrChangeComponent,
    CustomerDetailComponent,
    RoleCustomerComponent,
    RoleComponent,
    ListCustomerComponent,
    DepartmentComponent,
    EmaiOrSmsDetailComponent,
    EmailOrSmsComponent,
    EmailOrSmsAddOrChangeComponent,
    EmailOrSmsVerifyDetailComponent,
    BlogCategoryComponent,
    PostsComponent,
    PostSearchCategoryComponent,
    PostAddOrChangeComponent,
    PostAddOrChangeGeneralComponent,
    PostContentComponent,
    PostCategoryTreeComponent,
    AuthorsComponent,
    AuthorsAddOrUpdateComponent,
    TagsComponent,
    TagsAddOrUpdateComponent,
    AttributeRelationshipDetailComponent,
    AttributeRelationshipDetailAddOrUpdateComponent,
    CanaviRecuiterComponent,
    CanaviRecuiterJobsComponent,
    CanaviRecuiterDetailComponent,
    CanaviRecuiterExternalProfileComponent,
    CanaviRecuiterPaymentHistoryComponent,
    CanaviRecuiterUserMappingComponent,
    CandidatePaymentRequestComponent,
    CreateClaimCodeComponent,
    CanaviCandidateJobMappingComponent,
    CanaviRecuiterJobDetailComponent,
    CandidateListComponent,
    QuestionsComponent,
    QuestionsAddOrUpdateComponent,
    AnswersComponent,
    AnswersAddOrUpdateComponent,
    SeoDetailComponent,
    SeoDetailAddOrUpdateComponent,
    BannerComponent,
    BannerItemComponent,
    BannerAddOrChangeComponent,
    BannerItemAddOrChangeComponent,
    ComponentGroupComponent,
    ComponentGroupAddOrUpdateComponent,
    ComponentAttributeConfigComponent,
    ComponentAttributeConfigAddOrUpdateComponent,
    ComponentBlogPostConfigComponent,
    ComponentBlogPostConfigAddOrUpdateComponent,
    ComponentKeywordConfigComponent,
    ComponentKeywordConfigAddOrUpdateComponent,
    ComponentRecuiterConfigComponent,
    ComponentRecuiterConfigAddOrUpdateComponent,
    WikiComponent,
    WikiAddOrUpdateComponent,
    PostSeoComponent,
    FooterGroupComponent,
    FooterGroupAddOrChangeComponent,
    FooterGroupItemComponent,
    FooterGroupItemAddOrChangeComponent,
    ConfigFooterGroupComponent,
    ExportReportComponent,
    AppAuthenticationRecruiterComponent,
    ManageRecruiterComponent,
    ManageJobComponent,
    ListJobOfCompanyComponent
  ],
 


  imports: [
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatAutocompleteModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    CKEditorModule,
    FilterPipeModule,
    RouterModule.forRoot(routesConfig),
    NgbModule.forRoot(),
    FileUploadModule,
    NgxPaginationModule, // https://www.npmjs.com/package/ngx-pagination
    CustomFormsModule, // https://github.com/yuyang041060120/ng2-validation
    FullCalendarModule, // https://fullcalendar.io
    OrderModule, // https://www.npmjs.com/package/ngx-order-pipe
    ConfirmationPopoverModule.forRoot({ // https://github.com/mattlewis92/angular-confirmation-popover
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  exports: [
    RouterModule,
    EqualValidator,
    HrefPreventDefaultDirective
  ],
  entryComponents: [StatusRecruiterDialogComponent,JobComponentAddComponent,CandidatesApplyJobComponent]

})

export class AppRoutingModule { }
