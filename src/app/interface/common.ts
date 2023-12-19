export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface WorkshopsList {
    workshops: string[];
}