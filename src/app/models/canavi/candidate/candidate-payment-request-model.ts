export class CandidatePaymentRequestSearchRequest {
    candidateId: string;
    jobId: string;
    paymentType: number;
    pageIndex: number;
    pageSize: number;
}

export class CandidatePaymentRequestSearchResponse {
    id: string;
    candidateId: string;
    candidateName: string;
    jobId: string;
    jobName: string;
    paymentType: number;
    paymentTargetId: string;
    status: number;
    statusName: string;
    paymentTypeName: string;
}