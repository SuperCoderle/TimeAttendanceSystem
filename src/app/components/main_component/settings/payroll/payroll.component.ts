import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee, Payroll } from 'src/app/models/dto';
import { ListOfPayroll } from 'src/app/models/listOfColumn';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { PayrollService } from 'src/app/services/payroll/payroll.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {
  constructor(private payrollService: PayrollService, private employeeService: EmployeeService, private router: Router, private nzMessageService: NzMessageService) { }

  //Declare variables
  loading = false;
  indeterminate = false;
  listOfColumn = ListOfPayroll;
  listOfCurrentPageData: readonly Payroll[] = [];
  payrolls: readonly Payroll[] = [];
  employees: readonly Employee[] = [];
  editCache: { [key: string]: { edit: boolean; data: Payroll } } = {};
  employeeName(id: string): string {
    return this.employees.find(emp => emp.employeeID === id)!.fullname;
  }

  //Methods
  async handleLoadData() {
    this.loading = true;
    await this.payrollService.getAllPayrolls().subscribe({
      next: (result) => {
        setTimeout(() => {
          this.payrolls = result;
          this.loading = false;
          this.updateEditCache();
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.router.navigate(["/403"]);
        }
        else {
          this.loading = false;
        }
      }
    });
    await this.employeeService.getAllEmployees().subscribe({
      next: (result) => {
        setTimeout(() => {
          this.employees = result;
          this.loading = false;
          this.updateEditCache();
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 403) {
          this.router.navigate(["/403"]);
        }
        else {
          this.loading = false;
        }
      }
    });
  }

  handleReload() {
    this.payrolls = [];
    this.handleLoadData();
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
  }

  async confirm(id: number) {
    await this.payrollService.Delete(id)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.success('Xóa thành công');
          }, 600);
          this.handleLoadData();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.nzMessageService.error('Xóa thất bại');
        }
      })
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.payrolls.findIndex(item => item.payRollID === id);
    this.editCache[id] = {
      data: { ...this.payrolls[index] },
      edit: false
    };
  }

  async saveEdit(id: number) {
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    await this.payrollService.Update(this.editCache[id].data)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.remove(waiting);
            this.nzMessageService.success("Cập nhật xong");
          }, 600);
          this.handleReload();
        },
        error: (error) => {
          this.nzMessageService.remove(waiting);
          this.nzMessageService.error("Có lỗi xảy ra");
          console.log(error);
        }
      })
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.payrolls.forEach(item => {
      console.log(item);
      this.editCache[item.payRollID] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  exportXLSX(): void {
    let elm = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elm);

    //Tạo work book và thêm work sheet vào
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Payrol.xlsx');
  }

  ngOnInit(): void {
    this.handleLoadData();
  }
}