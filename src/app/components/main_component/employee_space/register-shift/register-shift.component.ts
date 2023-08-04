import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee, Schedule, Shift } from 'src/app/models/dto';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { ShiftColumnList } from 'src/app/models/listOfColumn';
import * as XLSX from 'xlsx';
import { CheckStatusCode } from 'src/app/status/status';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-register-shift',
  templateUrl: './register-shift.component.html',
  styleUrls: ['./register-shift.component.css']
})
export class RegisterShiftComponent {
  //Declare Variables
  checkStatusCode: CheckStatusCode = new CheckStatusCode(this.router);
  validateForm: UntypedFormGroup;
  idEmployee: number = 0;
  title: string = "";
  token?: string | null = localStorage.getItem("token");
  user: any;
  listOfColumn = ShiftColumnList;
  employees: readonly Employee[] = [];
  schedules: readonly Schedule[] = [];
  shifts: readonly Shift[] = [];
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Schedule[] = [];
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }
  employeeName(id: string): string | undefined {
    let fullname = this.employees.find(x => x.employeeID === id)?.fullname;
    return fullname;
  }
  shiftName(id: number): string | undefined {
    let shiftName = this.shifts.find(x => x.shiftID === id)?.shiftName;
    return shiftName;
  }

  //Constructor
  constructor(private formBuilder: UntypedFormBuilder,  
              private nzMessageService: NzMessageService, 
              private useService: UseServiceService,
              private router: Router) {

    if (this.token != null) {
      this.user = jwt_decode(this.token);
    }

    this.validateForm = this.formBuilder.group({
      employee: ['', [Validators.required]],
      workDate: ['', [Validators.required]],
      shift: [0, Validators.required],
      description: [null],
    });

    this.idEmployee > 0 ? this.title = "Cập nhật thông tin nhân viên" : this.title = "Đăng ký ca";
    this.loadData();
  }

  //Methos
  async submit() {
    var data: Schedule = {
      scheduleID: uuid(),
      shiftID: this.validateForm.controls["shift"].value,
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

    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId
    await this.useService.postData("Schedules/", data)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.remove(id);
            this.nzMessageService.success('Đăng ký ca thành công, quay lại trong 5 giây', { nzDuration: 5000 });
            setTimeout(() => {
              window.location.reload();
            }, 5000)
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.nzMessageService.remove(id);
          if (error.status == 400) {
            this.nzMessageService.error(error.error, { nzDuration: 5000 });
          }
        }
      })
  }

  async loadData() {
    await this.useService.getData("Employees/")
      .subscribe({
        next: (result) => {
          this.employees = result;
        },
        error: (error: HttpErrorResponse) => {
          this.checkStatusCode.ErrorResponse(error.status) ? "" : console.log(error);
        }
      })
    await this.useService.getData("Schedules/")
      .subscribe({
        next: (result) => {
          this.schedules = result;
        },
        error: (error: HttpErrorResponse) => {
          this.checkStatusCode.ErrorResponse(error.status) ? "" : console.log(error);
        }
      })
    await this.useService.getData("Shifts")
      .subscribe({
        next: (result) => {
          this.shifts = result;
        },
        error: (error: HttpErrorResponse) => {
          this.checkStatusCode.ErrorResponse(error.status) ? "" : console.log(error);
        }
      })
  }

  async confirm(scheduleID: string) {
    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.getData(`Schedules/${scheduleID}`)
      .subscribe({
        next: (result) => {
          setTimeout(async () => {
            result.approvedAt = new Date();
            result.approvedBy = this.user["fullname"];
            result.status = "Đã duyệt";
            this.approve(result);
            this.nzMessageService.remove(id);
            this.nzMessageService.success('Đã duyệt đơn', { nzDuration: 2000 });
          }, 600);
        },
        error: (error: HttpErrorResponse) => {
          this.nzMessageService.remove(id);
          console.log(error);
        }
      })
    this.loadData();
  }

  async approve(sche: Schedule) {
    await this.useService.putData(`Schedules/${sche.scheduleID}?action=Update`, sche)
      .subscribe({
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      })
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
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Đăng ký ca.xlsx');
  }
}
