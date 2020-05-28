export class CanaviAttributeValueSearchRequest {
    id: string;
    value: string;
    attributeId: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviAttribtuteValueModel {
    id: string;
    parentAttributeValueId: string;
    attributeId: string;
    value: string;
    displayOrder: number;
    status: number;
}
