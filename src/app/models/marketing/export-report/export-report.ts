export class ExportReportRequest {
    startDate: string;
    endDate: string;
}

export class ReportLiveCVResponse {
    candidateId: string;
    candidateName: string;
    email: string;
    phone: string;
    extraId: string;
    templateName: string;
    templateId: string;
    listCategory: string;
    createTime: string;
}

export class ReportRecruiterResponse{
    recruiterId: string;
    recruiterName: string;
    recruiterCreateTime: string;
    recruiterUrl: string;
}