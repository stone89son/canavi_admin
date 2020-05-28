export class JobSearchRequest {
    recuiterId: string;
    title: string;
    status: string;
    mapStatus: string;
    attributeId: string;
    attributeValueIds: string[];
    pageIndex: number;
    pageSize: number;
    fromPage: number;
    toPage: number;
}
