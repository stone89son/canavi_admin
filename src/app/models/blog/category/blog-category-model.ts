import { KeyValueModel, BaseModel } from '../../upload/result-model';

export class BlogCategoryManagerModel {
    types: KeyValueModel[];
    statuses: KeyValueModel[];
    parents: BlogCategoryModel[];
    categories: BlogCategoryModel[];
    category: BlogCategoryModel;
}

export class BlogCategoryModel extends BaseModel {
    parentId: string;
    name: string;
    status: number;
    logo: string;
    displayOrder: number;
    type: number;
}
