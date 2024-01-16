export interface Workshop {
    workshop_name: string;
    workshop_date: string;
    status: string;
    total_customers: number;
}

export interface SearchWorkshop {
    workshop: string;
    status: string;
}