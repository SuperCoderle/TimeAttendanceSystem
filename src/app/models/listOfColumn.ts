import { Employee, Payroll, Schedule, Violation } from "./dto"


//Employee
export var ListOfColumnEmployee =
    [
        {
            title: 'Họ và Tên',
            compare: (a: Employee, b: Employee) => a.fullname.localeCompare(b.fullname),
            priority: false
        },
        {
            title: 'Ngày sinh',
            compare: (a: Employee, b: Employee) => Number(a.birthday) - Number(b.birthday),
            priority: 4
        },
        {
            title: 'Giới tính',
            compare: (a: Employee, b: Employee) => a.gender.localeCompare(b.gender),
            priority: 3
        },
        {
            title: 'Được tạo bởi',
            compare: (a: Employee, b: Employee) => Number(a.createdAt) - Number(b.createdAt),
            priority: 2
        },
        {
            title: 'Cập nhật',
            compare: (a: Employee, b: Employee) => Number(a.lastUpdatedAt) - Number(b.lastUpdatedAt),
            priority: 1
        }
    ]
//Schedule
export var ListOfColumnShift =
    [
        {
            title: 'Nhân viên',
            compare: (a: Schedule, b: Schedule) => a.employeeID.localeCompare(b.employeeID),
            priority: false
        },
        {
            title: 'Ca làm',
            compare: (a: Schedule, b: Schedule) => a.shift.localeCompare(b.shift),
            priority: 7
        },
        {
            title: 'Ngày làm',
            compare: (a: Schedule, b: Schedule) => Number(a.workDate) - Number(b.workDate),
            priority: 6
        },
        {
            title: 'Nội dung',
            compare: (a: Schedule, b: Schedule) => a.description.localeCompare(b.description),
            priority: 5
        },
        {
            title: 'Trạng thái',
            compare: (a: Schedule, b: Schedule) => a.status.localeCompare(b.status),
            priority: 4
        },
        {
            title: 'Vi phạm',
            compare: (a: Schedule, b: Schedule) => Number(a.violationID) - Number(b.violationID),
            priority: 3
        },
        {
            title: 'Xác nhận bởi',
            compare: (a: Schedule, b: Schedule) => Number(a.approvedAt) - Number(b.approvedAt),
            priority: 2
        },
        {
            title: 'Được tạo bởi',
            compare: (a: Schedule, b: Schedule) => Number(a.createdAt) - Number(b.createdAt),
            priority: 1
        }
    ]

//Violation
export var ListOfColumnViolation = 
    [
        {
            title: 'Loại vi phạm',
            compare: (a: Violation, b: Violation) => a.typeOfViolation.localeCompare(b.typeOfViolation),
            priority: false
        },
        {
            title: 'Tiền trừ',
            compare: (a: Violation, b: Violation) => a.amountDeducted - b.amountDeducted,
            priority: 1
        }
    ]

//Payroll
export var ListOfPayroll =
    [
        {
            title: 'Nhân viên',
            compare: (a: Payroll, b: Payroll) => a.employeeID.localeCompare(b.employeeID),
            priority: false
        },
        {
            title: 'Vị trí',
            compare: (a: Payroll, b: Payroll) => a.position.localeCompare(b.position),
            priority: 2
        },
        {
            title: 'Lương cơ bản',
            compare: (a: Payroll, b: Payroll) => a.basicSalary - b.basicSalary,
            priority: 1
        }
    ]