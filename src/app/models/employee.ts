export interface Employee {
    idEmployees: number;
    nameEmployees: string;
    yearOfBirth: String;
    gender: string;
    phone?: string | null;
    role: String;
    email?: String | null;
    password: String;
    createdAt: Date;
    lastUpdatedAt?: Date | null;
}