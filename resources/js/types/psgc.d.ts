export interface PSGCRegion {
    id: string;
    name: string;
    code: string;
}

export interface PSGCProvince {
    id: string;
    name: string;
    code: string;
    regionCode: string;
}

export interface PSGCCity {
    id: string;
    name: string;
    code: string;
    provinceCode: string;
}