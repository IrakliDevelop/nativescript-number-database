export interface ApiModel {
    id: number;
    name: string;
    role: string;
}

export interface ApiResponse {
    res: string;
    err?: string;
    valid_number: string;
    info?: NumberInfo;
}

export interface NumberInfo {
    name?: string;
    image?: string;
    gallery?: any[];
}
