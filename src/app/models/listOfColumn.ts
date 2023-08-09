import { Employee, Payroll, Schedule, Violation, Report, Menu } from "./dto"


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
            priority: 4
        },
        {
            title: 'Ngày làm',
            compare: (a: Schedule, b: Schedule) => Number(a.workDate) - Number(b.workDate),
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

    export var ShiftColumnListTablet =
    [
        {
            title: 'Nhân viên',
            compare: (a: Schedule, b: Schedule) => a.employeeID.localeCompare(b.employeeID),
            priority: false
        },
        {
            title: 'Ca làm',
            compare: (a: Schedule, b: Schedule) => a.shiftID - b.shiftID,
            priority: 2
        },
        {
            title: 'Ngày làm',
            compare: (a: Schedule, b: Schedule) => Number(a.workDate) - Number(b.workDate),
            priority: 1
        }
    ]

//Violation
export var ViolationColumnList = 
    [
        {
            title: 'Lỗi vi phạm',
            compare: (a: Violation, b: Violation) => a.violationError.localeCompare(b.violationError),
            priority: false
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

//Menus
export var MenuColumnList = 
    [
        {
            title: "Tiêu đề",
            compare: (a: Menu, b: Menu) => a.title.localeCompare(b.title),
            priority: false
        },
        {
            title: "Url",
            compare: (a: Menu, b: Menu) => a.url.localeCompare(b.url),
            priority: 4
        },
        {
            title: "Trang",
            compare: (a: Menu, b: Menu) => a.parentID - b.parentID,
            priority: 3
        },
        {
            title: "Kích hoạt",
            compare: (a: Menu, b: Menu) => Number(a.isActive) - Number(b.isActive),
            priority: 2
        },
        {
            title: "Mở rộng",
            compare: (a: Menu, b:Menu) => Number(a.isSubmenu) - Number(b.isSubmenu),
            priority: 1
        }
    ]