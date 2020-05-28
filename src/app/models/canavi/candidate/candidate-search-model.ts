export class CandidateSearchRequest {
    keyword: string;
    pageIndex: number;
    pageSize: number;
}
export class CandidateGetByJobCampaignRequest{
    jobId:string;
}
export class CandidateSearchResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: number;
    statusName: string;
}