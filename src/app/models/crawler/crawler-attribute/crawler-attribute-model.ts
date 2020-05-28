import { CrawlerAttributeValueModel } from './crawler-attribute-value-model';

export class CrawlerAttributeModel {
    id: string;
    name: string;
    createdOnUtc: Date;
    updatedOnUtc: Date;
    createdUserId: string;
    updatedUserId: string;
    attributeValueIds: string[];
    attributeValues: CrawlerAttributeValueModel[];
}