export class CanaviRecuiterExternalProfileSearchRequest {
    recuiterId: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviRecuiterExternalProfileSearchResponse {
    sourceType: number;
    sourceId: string;
    originalProfileName: string;
    sourceUrl: string;
}