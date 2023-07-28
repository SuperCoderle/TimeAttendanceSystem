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

//Schedule
export interface Schedule {
    scheduleID: string,
    shift: string,
    timeIn: string,
    timeOut: String,
    workDate: Date,
    description: string,
    employeeID: string,
    totalWorkHours: number,
    status: string,
    violationID: number | null,
    approvedAt: Date | null,
    approvedBy: string | null,
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
