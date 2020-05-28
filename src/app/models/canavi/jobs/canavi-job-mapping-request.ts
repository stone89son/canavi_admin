export class CanaviJobMappingRequest {
  Id: string;
  TemplateId: string;
  RecuiterId: string;
  Title: string;
  Status: number;
  JobType: number;
  NeedToInterview: boolean;
  CandidateApplyCount: number;
  RefCrawlerJobId: string;
  OriginalJobId: string;
  NumberSlot: number;
  SuggestCandidate: number;
  Commission: number;
  CommissionType: number;
  CandidateCommission: number;
  CandidateCommissionType: number;
  ExpirationDateUtcString: string;
  SalaryType: number;
  SalaryValue: number;
  SalaryFrom: number;
  SalaryTo: number;
  SalaryRange: any;
  Categories: any;
  Locations: any;
  Skills: any;
  Languages: any;
  WorkingTypes: any;
  Genders: any;
  ExperienceRanges: any;
  Attributes: any;
  ProfileInclude: string;
  JobDescription: string;
  JobRequirement: string;
  JobBenefit: string;
}

export class CanaviJobGetByOriginalIdRequest {
  Id: string;
  RefCrawlerJobId: string;
  IsGetAtttribute: boolean;
  IsGetRecuiter: boolean;
  IsGetListAttributeValue: boolean;
}

export class CanaviJobGetByRecuiterIdRequest {
  title: string;
  recuiterId: string;
  pageIndex: number;
  pageSize: number;
}

export class CanaviJobGetByRecuiterIdResponse {
  id: string;
  recuiterId: string;
  title: string;
  numberSlot: number;
  suggestCandidate: number;
  countJobApplied: number;
  countJobWaitingForInterview: number;
  countJobApprovedAndWaitingForCreateCode: number;
  countJobAcceptedInvite: number;
  countJobCompleted: number;
  status: number;
}

export class CanaviJobMappingStatisticRequest {
  jobId: string;
  pageIndex: number;
  pageSize: number;
}
export class CandidateJobMappingStatisticResponse {
  job: any;
  jobStatistic: any;
}
