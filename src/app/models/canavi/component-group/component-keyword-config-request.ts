export class ComponentKeywordConfigSearchRequest {
    componentGroupId: string;
    keyword: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class ComponentKeywordConfigModel {
    id: string;
    componentGroupId: string;
    keyword: string;
    displayOrder: number;
    status: number;
}