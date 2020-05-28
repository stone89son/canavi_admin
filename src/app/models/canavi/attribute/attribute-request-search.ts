export class CanaviAttributeSearchRequest {
    id: string;
    name: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviAttribtuteModel {
    id: string;
    name: string;
    type: number;
    displayOrder: number;
    status: number;
    isPrivateAttribute: boolean;
}
