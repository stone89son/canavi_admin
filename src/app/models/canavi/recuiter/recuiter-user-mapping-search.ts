export class CanaviRecuiterUserMappingSearchRequest {
    recuiterId: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviRecuiterUserMappingSearchResponse {
    recuiterId: string;
    userId: string;
    claimCode: string;
    status: number;
    statusName: string;
}
