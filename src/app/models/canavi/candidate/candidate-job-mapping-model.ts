export class CandidateJobMappingSearchRequest {
    jobId: string;
    jobStatusId: number;
    pageIndex: number;
    pageSize: number;
}

export class CandidateJobMappingSearchResponse {
    id: string;
    candidateId: string;
    candidateName: string;
    jobId: string;
    jobStatusId: number;
    jobStatusName: string;
}