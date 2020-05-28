export class FooterGroup {
    id: string;
    name: string;
    destinationLink: string;
    status: number;
    statusName: string;
    displayOrder: number;
}

export class FooterGroupGetAll {
}

export class FooterGroupAddOrChange {
    id: string;
    name: string;
    destinationLink: string;
    status: number;
    displayOrder: number;
}

export class FooterGroupItemGetAll {
    groupId: string
}

export class FooterGroupItem {
    id: string;
    name: string;
    url: string;
    groupId: string;
    status: string;
    displayOrder: number;
    statusName: string;
}

export class FooterGroupItemAddOrChange {
    id: string;
    name: string;
    url: string;
    groupId: string;
    status: string;
    displayOrder: number;
}

export class ConfigFooterGroup{
    id: string;
    groupId: string;
    col: number;
    row: number;
    totalItem: number;
    displayOrder: number;
}