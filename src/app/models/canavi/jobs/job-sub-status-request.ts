export class JobSubStatusGetsRequest {
    name: string;
    jobStatusId: string;
    pageIndex: number;
    pageSize: number;
}

export class JobSubStatusModel {
    id: string;
    name: string;
    description: string;
    bitValue: string;
    jobStatusId: string;
}