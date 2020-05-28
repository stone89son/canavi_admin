export class AuthenticationRecruiter {
    position: number;
    nameUser: string;
    phoneUser: string;
    emailUSer: string;
    nameCompany: string;
    authenticationCode: string;
    idCompany: string;
    idUser: string;
   
}
export class SearchType {
    value: string;
    viewValue: string;
}
export class CompanyAuthenticationSearch {
    keyword: string;
    searchType: number;
}

export class CompanyAuthenticationChangeStatus {
    RecruiterId: string;
    UserId: string;
    StatusClaim: number;
}