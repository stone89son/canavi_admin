export class SeoDetailModel {
    id: string;
    targetType: number;
    targetId: string;
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    metaRobotsIndex?: boolean;
    metaRobotsFollow?: boolean;
    canonicalUrl: string;
    facebookShareImage: string;
    targetName: string;
    slugUrl: string;
}

export class SeoDetailSearchRequest {
    targetType: number;
    title: string;
    pageIndex: number;
    pageSize: number;
}
