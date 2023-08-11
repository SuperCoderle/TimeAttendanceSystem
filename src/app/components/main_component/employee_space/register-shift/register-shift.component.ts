import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee, Schedule, Shift } from 'src/app/models/dto';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import { ShiftColumnList } from 'src/app/models/listOfColumn';
import * as XLSX from 'xlsx';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

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
  width = window.innerWidth;
  listOfColumn = ShiftColumnList;
  employees: readonly Employee[] = [];
  schedules: readonly Schedule[] = [];
  shifts: readonly Shift[] = [];
  loading = false;
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
  ) {

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
      isInProgress: true,
      isSubmit: false,
      isOpen: false,
      violationID: null,
      approvedAt: null,
      approvedBy: null,
      createdAt: new Date(),
      createdBy: "someone"
    }

    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId
    await this.useService.postData("Schedules/", data)
      .subscribe(() => {
        setTimeout(() => {
          this.nzMessageService.remove(id);
          this.nzMessageService.success('Đăng ký ca thành công');
          this.loadData();
        }, 600);
      });
  }

  async loadData() {
    this.loading = true;
    await this.useService.getData("Employees/")
      .subscribe((employees) => {
        setTimeout(() => {
          this.employees = employees;
        }, 600);
      });
    await this.useService.getData("Schedules/")
      .subscribe((schedules) => {
        setTimeout(() => {
          this.schedules = schedules;
          this.loading = false;
        }, 600);
      })
    await this.useService.getData("Shifts")
      .subscribe((shifts) => {
        setTimeout(() => {
          this.shifts = shifts;
        }, 600);
      })
  }

  async confirm(scheduleID: string, action: string) {
    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    await this.useService.getData(`Schedules/${scheduleID}`)
      .subscribe((schedule) => {
        setTimeout(async () => {
          switch (action) {
            case "approve":
              schedule.isSubmit = true;
              break;
            default:
              schedule.isSubmit = false;
              break;
          }
          schedule.isInProgress = false;
          this.approve(schedule);
          this.nzMessageService.remove(id);
          this.nzMessageService.success('Đã xong', { nzDuration: 2000 });
        }, 600);
      })
    this.loadData();
  }

  async approve(sche: Schedule) {
    await this.useService.putData(`Schedules/${sche.scheduleID}?action=Update`, sche).subscribe(() => {
      this.loadData();
    });
  }

  async delete(scheduleID: string) {
    await this.useService.deleteData(`Schedules/${scheduleID}`)
      .subscribe(() => {
        setTimeout(() => {
          this.nzMessageService.success('Xóa thành công');
        }, 600);
        this.loadData();
      })
  }

  handleReload() {
    this.schedules = [];
    this.loadData();
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
