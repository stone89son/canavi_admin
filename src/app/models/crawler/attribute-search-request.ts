export class AttributeSearchRequest {
    Id: string;
    Name: string;
    PageIndex: number;
    PageSize: number;
}

export class AttributeMappingRequest {
    OriginalAttributeId: string;
    TargetAttributeId: string;
    MappingType: string;
    WebsiteId: string;
    Status: number;
}

export enum TypeMapping {
    Recuiter = 1,
    Job = 2
}

export enum StatusEnum {
    Active = 1,
    Deleted = -1,
    New = 3,
    InActive = 2
}
