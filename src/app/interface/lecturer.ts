export interface Lecturer {
    id: string;
    timestamp: string;
    email: string;
    nickname: string;
    current_career: string;
    telephone_no: string;
    profile_picture: string;
    grade: string;
    remarks: string;
}

export interface SearchLecturer {
    career: string;
    nickname: string;
    productType: string;
}