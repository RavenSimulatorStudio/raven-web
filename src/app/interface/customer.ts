export interface Customer {
    timestamp: string;
    email_logged_in: string;
    email_confirmed: string;
    workshop_name: string;
    statement_evidence: string;
    name_surname: string;
    nickname: string;
    education: string;
    telephone_no: string;
    source: string;
    remark: string;
    open_email: boolean;
    approval: string;
    order_no: string;
    id: string;
    status: string;
}

export interface SearchCustomer {
    workshop: string;
    nickname: string;
    status: string;
}


export interface ApproveStatus {
    id: string;
    approval: string;
    status: string;
}

export interface UpdateRemarks {
    id: string;
    remark: string;
}