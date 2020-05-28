export class BlogSearchRequestModel {
    id: string;
    title: string;
    categoryId: string;
    isFeaturePost: boolean;
    status: number[];
    pageIndex: number;
    pageSize: number;
}

export class BlogSearchResponse {
    id: string;
    title: string;
    thumnail: string;
    featureThumnail: string;
    shortDescription: string;
    content: string;
    isFeaturePost: boolean;
    authorId: string;
    authorName: string;
    displayOrder: number;
    publishDateUtc: Date;
    status: number;
    fullUrlOrigin: string;
}
