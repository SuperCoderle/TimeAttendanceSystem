export interface TimeLog {
    idTimeLogs: number,
    status: string | null,
    createdAt: Date | null,
    clockIn: Date | null,
    clockOut: Date | null,
    idEmployee: number
}