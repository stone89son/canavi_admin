import { KeyValueModel } from '../../upload/result-model';
import { SeoDetailModel } from 'src/app/models/marketing/seo-detail/seo-detail-model';

export class PostModel {
    id: string;
    module: number;
    postContentModel: PostContentModel;
    postCategoryModel: PostCategoryModel;
    isInitData: boolean;
    seoDetail: SeoDetailModel;
}

export class PostContentModel {
    title: string;
    thumnail: string;
    featureThumnail: string;
    shortDescription: string;
    content: string;
    status: number;
    isFeaturePost: boolean;
    displayOrder: number;
    authorId: string;
    authorName: string;
    publishDateUtc: Date;
    tags: string[];
    tagSelecteds: KeyValueModel[];
}

export class PostCategoryModel {
    mainCategory: string;
    mainCategoryId: string;
    subCategories: KeyValueModel[];
}
