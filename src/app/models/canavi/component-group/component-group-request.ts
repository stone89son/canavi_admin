export class ComponentGroupSearchRequest {
    name: string;
    componentGroupType: number;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class ComponentGroupModel {
    id: string;
    name: string;
    displayOrder: number;
    groupType: number;
    status: number;
}