import { Employee, Payroll, Schedule, Violation, Report } from "./dto"


//Employee
export var EmployeeColumnList =
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
        }
    ]
//Schedule
export var ShiftColumnList =
    [
        {
            title: 'Nhân viên',
            compare: (a: Schedule, b: Schedule) => a.employeeID.localeCompare(b.employeeID),
            priority: false
        },
        {
            title: 'Ca làm',
            compare: (a: Schedule, b: Schedule) => a.shiftID - b.shiftID,
            priority: 6
        },
        {
            title: 'Ngày làm',
            compare: (a: Schedule, b: Schedule) => Number(a.workDate) - Number(b.workDate),
            priority: 5
        },
        {
            title: 'Nội dung',
            compare: (a: Schedule, b: Schedule) => a.description.localeCompare(b.description),
            priority: 4
        },
        {
            title: 'Trạng thái',
            compare: (a: Schedule, b: Schedule) => a.status.localeCompare(b.status),
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
export var ViolationColumnList = 
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
export var PayrollColumnList =
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

//Report
export var ReportColumnList = 
    [
        {
            title: "Nhân viên",
            compare: (a: Report, b: Report) => a.employeeID.localeCompare(b.employeeID),
            priority: false
        },
        {
            title: "Tiêu đề",
            compare: (a: Report, b: Report) => a.title.localeCompare(b.title),
            priority: 3
        },
        {
            title: "Tổng lương",
            compare: (a: Report, b: Report) => a.grossPay - b.grossPay,
            priority: 2
        },
        {
            title: "Trạng thái",
            compare: (a: Report, b: Report) => a.paidStatus.localeCompare(b.paidStatus),
            priority: 1
        }
    ]