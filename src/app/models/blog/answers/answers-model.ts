export class AnswersSearchRequest {
    questionId: string;
    content: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class AnswersSearchResponse {
    id: string;
    content: string;
    questionId: string;
    helpfullCount: number;
    status: number;
    statusName: string;
}

export class AnswersModel {
    id: string;
    content: string;
    questionId: string;
    status: number;
    helpfullCount: number;
}