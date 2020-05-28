export class CanaviSearchHistorySearchRequest {
    keyword: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviSearchHistoryModel {
    id: string;
    keyword: string;
    boostScore: number;
}
