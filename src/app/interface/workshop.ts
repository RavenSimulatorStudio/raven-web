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

export interface UpdateWorkshopInfo {
    id: string;
    check_morning: boolean;
    check_afternoon: boolean;
    remark: string;
}

