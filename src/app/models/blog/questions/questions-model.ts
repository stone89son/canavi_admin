import { KeyValueModel } from "../../upload/result-model";

export class QuestionsSearchRequest {
    content: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class QuestionsSearchResponse {
    id: string;
    content: string;
    categoryId: string;
    displayOrder: number;
    status: number;
    categoryName: string;
    statusName: string;
}

export class QuestionsModel {
    id: string;
    content: string;
    categoryId: string;
    status: number;
    displayOrder: number;
    tags: string[];
    tagSelecteds: KeyValueModel[];
}