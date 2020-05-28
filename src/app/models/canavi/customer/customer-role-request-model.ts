import { KeyValueModel } from "src/app/models/result-model";

export class CustomerRoleGetsRequest {
    roleId: string;
    departmentId: string;
    keyword: string;
}

export class CustomerRoleModel {
    id: string;
    email: string;
    fullName: string;
    code: string;
    phoneNumber: string;
}

export class CustomerRoleResponse {
    departments: KeyValueModel[];
    roles: KeyValueModel[];
}
