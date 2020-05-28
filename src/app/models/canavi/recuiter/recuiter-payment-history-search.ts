export class CanaviRecuiterPaymentHistorySearchRequest {
    recuiterId: string;
    pageIndex: number;
    pageSize: number;
}

export class CanaviRecuiterPaymentHistorySearchResponse {
    paymentAmount: number;
    paymentType: number;
    paymentTypeName: string;
    status:number;
    statusName:string;
    transactionCode: string;
    paymentTarget: number;
}