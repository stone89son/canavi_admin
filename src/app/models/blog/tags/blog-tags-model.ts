export class BlogTagsModel {
    name: string;
    status: number;
    displayOrder: number;
    type: number;
}

export class BlogTagsSearchRequest {
    name: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class BlogTagsSearchResponse {
    id: string;
    name: string;
    status: number;
    statusName: string;
    type: number;
    typeName: string;
    displayOrder: number;
}
