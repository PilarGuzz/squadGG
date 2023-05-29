export interface ReportDTO {
    id: number;
    user:    string | null;
    post:    number;
    reason:  string;
    status: string;
    message: string;
}