//Employee
export interface Employee {
    employeeID: string;
    fullname: string;
    birthday: Date;
    gender: string;
    phoneNumber?: string;
    createdAt: Date;
    createdBy: string;
    lastUpdatedAt?: Date | null;
    lastUpdatedBy?: string | null;
}

//User
export interface User {
    userID: string;
    fullname: string;
    email: string;
    password: string;
    employeeID?: string | null;
    lastLoggedIn?: Date | null;
    createdAt: Date;
    lastUpdatedAt?: Date | null;
    isManager: boolean;
    isActive: boolean;
}

//Schedule
export interface Schedule {
    scheduleID: string,
    shiftID: number,
    timeIn: string,
    timeOut: string,
    workDate: Date,
    description: string,
    employeeID: string,
    totalWorkHours: number,
    status: string,
    violationID?: number | null,
    approvedAt?: Date | null,
    approvedBy?: string | null,
    createdAt: Date,
    createdBy: string
}

//Violation
export interface Violation {
    violationID: number,
    typeOfViolation: string,
    amountDeducted: number
}

//Payroll
export interface Payroll {
    payRollID: number,
    position: string,
    basicSalary: number,
    employeeID: string
}

//Menu
export interface Menu {
    menuID: number,
    title: string,
    url: string,
    parent: string,
    isActive: boolean,
    createdAt: Date,
    lastUpdatedAt?: Date | null,
    lastUpdatedBy?: string | null
}

//Shift
export interface Shift {
    shiftID: number,
    shiftName: string,
    startTime: string,
    endTime: string
}

//Report
export interface Report {
    reportID: number,
    title: string,
    description?: string,
    employeeID: string,
    grossPay: number,
    monthlyReport: number,
    paidStatus: string,
    createdAt: Date,
    lastUpdatedAt?: Date,
    lastUpdatedBy?: string
}