export interface LoginData {
    email: string;
    password: string;
}

export interface EmailData {
    type: string;
    subject: string;
    body: string;
    skip: number | null;
    take: number | null;
}

export interface Alert {
    icon: 'success' | 'error' | 'warning' | 'question' | 'info';
    title: string;
}

export interface LoginResponse {
    message: string;
}