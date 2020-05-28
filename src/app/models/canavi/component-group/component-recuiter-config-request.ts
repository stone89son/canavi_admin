export class ComponentRecuiterConfigSearchRequest {
    componentGroupId: string;
    targetId: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class ComponentRecuiterConfigModel {
    id: string;
    componentGroupId: string;
    targetId: string;
    recuiterName: string;
    displayOrder: number;
    status: number;
}