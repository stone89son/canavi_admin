export class CommisstionFeeSearchRequest {
    objectType: string;
    categoryId: string;
    workingTypeId: string;
    configType: number;
    commissionType: number;
    recuiterId: string;
    jobId: string;
    fromStartDateUtc: string;
    toStartDateUtc: string;
    fromEndDateUtc: string;
    toEndDateUtc: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class CommisstionFeeModel {
    id: string;
    objectType: number;
    configType: number;
    categoryId: string;
    workingTypeId: string;
    commissionType: number;
    recuiterId: string;
    jobId: string;
    startDateUtc: string;
    endDateUtc: string;
    value: number;
    status: number;
    objectTypeName: string;
    configTypeName: string;
    categoryName: string;
    workingTypeName: string;
    recuiterName: string;
    jobName: string;
    commissionTypeName: string;
    statusName: string;
}
