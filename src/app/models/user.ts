export interface User {
    userID: String;
    fullname?: string;
    email: String;
    password: String;
    employeeID?: String | null;
    lastLoggedIn: Date | null;
    createdAt: Date;
    lastUpdatedAt: Date | null;
    isManager: boolean;
    isActive: boolean;
}