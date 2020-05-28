export class BlogAuthorsModel {
    name: string;
    position: string;
    avatar: string;
    shortDescription: string;
    description: string;
    status: number;
}

export class BlogAuthorsSearchRequest {
    name: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class BlogAuthorsSearchResponse {
    id: string;
    name: string;
    position: string;
    avatar: string;
    shortDescription: string;
    description: string;
    status: number;
    statusName: string;
}
