export class ComponentAttributeConfigSearchRequest {
    componentGroupId: string;
    attributeType: number;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class ComponentAttributeConfigModel {
    id: string;
    componentGroupId: string;
    attributeType: number;
    attributeTypeName: string;
    attributeValueId: string;
    attributeValueName: string;
    displayOrder: number;
    status: number;
}
