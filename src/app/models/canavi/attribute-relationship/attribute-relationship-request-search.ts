export class CanaviAttributeRelationshipSearchRequest {
    orgAttributeId: string;
    relatedAttributeId: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviAttribtuteRelationshipModel {
    id: string;
    orgAttributeId: string;
    orgAttributeName: string;
    relatedAttributeId: string;
    relatedAttributeName: string;
    status: number;
}
