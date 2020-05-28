export class EmailOrSmsAddOrUpdateRequest {
    id: string;
    type: number;
    messageType: number;
    phoneNumber: string;
    email: string;
    title: string;
    content: string;
    status: number;
}
