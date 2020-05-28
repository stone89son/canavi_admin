export class JobStatusGetsRequest {
    name: string;
    jobStatusGroupId: string;
    pageIndex: number;
    pageSize: number;
}

export class JobStatusModel {
    id: string;
    name: string;
    description: string;
    bitValue: string;
    jobStatusGroupId: string;
}
