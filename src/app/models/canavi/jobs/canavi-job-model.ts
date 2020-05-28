export class CanaviJobGetResponse {
    job: JobModel;
}

export class JobModel {
    id: string;
    title: string;
    numberSlot: number;
    suggestCandidate: number;
}
