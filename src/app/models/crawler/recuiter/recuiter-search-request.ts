export class RecuiterSearchRequest {
    id: string;
    websiteId: string;
    name: string;
    status: string;
    mapstatus: string;
    pageIndex: number;
    pageSize: number;
    fromPage: number;
    toPage: number;
    attributeValueIds: string[];
}


export class RecuiterSearchByIdRequest {
    id: string;
}
