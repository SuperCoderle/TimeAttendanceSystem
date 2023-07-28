import jwt_decode from 'jwt-decode';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Attendance } from 'src/app/models/attendance';
import { Employee, Schedule } from 'src/app/models/dto';
import { TimeLog } from 'src/app/models/timelog';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { TimelogService } from 'src/app/services/timelog/timelog.service';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { ListOfColumnShift } from 'src/app/models/listOfColumn';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-register-shift',
  templateUrl: './register-shift.component.html',
  styleUrls: ['./register-shift.component.css']
})
export class RegisterShiftComponent {
  //Declare Variables
  validateForm: UntypedFormGroup;
  idEmployee: number = 0;
  title: string = "";
  token?: string | null = localStorage.getItem("token");
  user: any;
  listOfColumn = ListOfColumnShift;
  employees: readonly Employee[] = [];
  schedules: readonly Schedule[] = [];
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Schedule[] = [];
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }
  time(shift: string): string {
    let time = "";
    switch (shift) {
      case "Ca sáng":
        time = "07:00 - 15:00";
        break;
      case "Ca chiều":
        time = "15:00 - 23:00";
        break;
      case "Ca tối":
        time = "23:00 - 07:00";
        break;
    }
    return time;
  }
  employeeName(id: string): string {
    return this.employees.find(x => x.employeeID === id)!.fullname;
  }

  //Constructor
  constructor(private formBuilder: UntypedFormBuilder, private employeeService: EmployeeService, private router: Router, private message: NzMessageService
    , private scheduleService: ScheduleService, private timeLogService: TimelogService, private attendanceService: AttendanceService) {
    if (this.token != null) {
      this.user = jwt_decode(this.token);
    }

    this.validateForm = this.formBuilder.group({
      employee: ['', [Validators.required]],
      workDate: ['', [Validators.required]],
      shift: ['', Validators.required],
      description: [null],
    });

    this.idEmployee > 0 ? this.title = "Cập nhật thông tin nhân viên" : this.title = "Đăng ký ca";
    this.loadData();
  }

  //Methos
  async submit() {
    var data: Schedule = {
      scheduleID: uuid(),
      shift: this.validateForm.controls["shift"].value,
      timeIn: '00:00:00',
      timeOut: '00:00:00',
      workDate: this.validateForm.controls["workDate"].value,
      description: this.validateForm.controls["description"].value,
      employeeID: this.validateForm.controls["employee"].value,
      totalWorkHours: 0.0,
      status: 'Đang chờ',
      violationID: null,
      approvedAt: null,
      approvedBy: null,
      createdAt: new Date(),
      createdBy: this.user["fullname"]
    }

    const id = this.message.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId
    await this.scheduleService.Add(data)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.message.remove(id);
            this.message.success('Đăng ký ca thành công, quay lại trong 5 giây', { nzDuration: 5000 });
            this.createTimeLog();
            setTimeout(() => {
              window.location.reload();
            }, 5000)
          }, 600);
        },
        error: (error) => {
          this.message.remove(id);
          if (error.status == 400) {
            this.message.error(error.error, { nzDuration: 5000 });
          }
        }
      })
  }

  async createTimeLog() {
    const timelog: TimeLog = {
      idTimeLogs: 0,
      status: null,
      createdAt: this.validateForm.controls["scheduleDate"].value,
      clockIn: null,
      clockOut: null,
      idEmployee: this.validateForm.controls["employee"].value
    }

    const attendance: Attendance = {
      idAttendance: 0,
      createdAt: this.validateForm.controls["scheduleDate"].value,
      totalWorkHours: 0,
      idEmployee: this.validateForm.controls["employee"].value,
      idTimeLogs: 0
    }

    await this.timeLogService.Add(timelog)
      .subscribe({
        next: (result) => {
          attendance.idTimeLogs = result.idTimeLogs;
          this.create_Attendance(attendance);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  async create_Attendance(data: Attendance) {
    await this.attendanceService.Add(data)
      .subscribe({
        error: (error) => {
          console.log(error);
        }
      })
  }

  async loadData() {
    await this.employeeService.getAllEmployees()
      .subscribe({
        next: (result) => {
          this.employees = result;
        },
        error: (error) => {
          console.log(error);
        }
      })
    await this.scheduleService.getAllSchedules()
      .subscribe({
        next: (result) => {
          this.schedules = result;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  async update() {
    const data = {

    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    }
    return {};
  };

  exportXLSX(): void {
    let elm = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elm);

    //Tạo work book và thêm work sheet vào
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Đăng ký ca.xlsx');
  }
}
