export class CanaviAttributeFilerMappingSearchRequest {
    attributeId: string;
    attributeMappingType: number;
    pageIndex: number;
    pageSize: number;
}

export class CanaviAttribtuteFilterMappingModel {
    id: string;
    attributeMappingType: number;
    attributeId: string;
    status: number;
    attributeName: string;
    attributeMappingTypeName: string;
    filterTypeName: string;
    statusName: string;
}
