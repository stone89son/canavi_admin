import { ResultModel, KeyValueModel, BaseModel } from '../../result-model';
export class CrawlerAttributeValueSearchRequest {
    attributeValueId: string;
    attributeId: string;
    value: string;    
    pageIndex: number;
    pageSize: number;
}
