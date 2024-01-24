export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface WorkshopsList {
    workshops: string[];
}

export interface WorkshopsListSearch {
    workshop_status?: string;
    certificate_flag?: boolean;
}