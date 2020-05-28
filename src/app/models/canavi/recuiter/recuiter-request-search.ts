export class CanaviRecuiterSearchRequest {
    name: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviRecuiterSearchResponse {
    id: string;
    name: string;
    logoResize: string;
    jobCount: number;
    statusName: string;
    status: number;
    createdUid: string;
}

export class CanaviRecuiterGetRequest {
    id: string;
}
