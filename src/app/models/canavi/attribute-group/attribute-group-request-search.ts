export class CanaviAttributeGroupSearchRequest {
    name: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviAttribtuteGroupModel {
    id: string;
    name: string;
    isDisplayGroupName: boolean;
    groupType: number;
}

export class CanaviAttribtuteGroupMappingModel {
    id: string;
    attributeGroupId: string;
    attributeId: string;
    isRequired: boolean;
    isPrivate: boolean;
    isParentAttribute: boolean;
    tooltipDescription: string;
    tooltipUrl: string;
    parentAttributeId: string;
    displayOrder: number;
    status: number;
    attributeType: number;
    attributeTypeName: string;
    statusName: string;
    attributeName: string;
    parentAttributeName: string;
}

export class CanaviAttributeGroupMappingSearchRequest {
    attributeGroupId: string;
    pageIndex: number;
    pageSize: number;
}
