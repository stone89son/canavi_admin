import { DecimalPipe } from '@angular/common';

export class RecuiterMappingRequest {
    Id: string;
    Email: string;
    Phone: number;
    Name: string;
    Address: string;
    ProfileCompletePercent: DecimalPipe;
    RefCrawlerRecuiterId: string;
    Status: string;
    RecuiterBanners: any;
    RecuiterMedias: any;
    Attributes: any;
    TemplateId: string;
}
