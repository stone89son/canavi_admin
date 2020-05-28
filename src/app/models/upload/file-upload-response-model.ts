import { ResultModel } from './result-model';
export class FileUploadResponseModel extends ResultModel {
    fullUrl: string;
    name: string;
    path: string;
    hostName: string;
}

export class FileSearchResponseModel {
    fileName: string;
    filePath: string;
    createdDateUtc: string;
    targetFullUrl: string;
}

