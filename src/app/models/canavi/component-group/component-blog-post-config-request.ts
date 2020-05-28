export class ComponentBlogPostConfigSearchRequest {
    componentGroupId: string;
    targetId: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}

export class ComponentBlogPostConfigModel {
    id: string;
    componentGroupId: string;
    targetId: string;
    postTitle: string;
    displayOrder: number;
    status: number;
}