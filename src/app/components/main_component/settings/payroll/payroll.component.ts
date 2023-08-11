import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee, Payroll } from 'src/app/models/dto';
import { PayrollColumnList } from 'src/app/models/listOfColumn';
import { UseServiceService } from 'src/app/services/useService/use-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})

export class PayrollComponent {
  constructor( 
              private nzMessageService: NzMessageService,
              private useService: UseServiceService) { }

  //Declare variables
  loading = false;
  width = window.innerWidth;
  listOfColumn = PayrollColumnList;
  payrolls: readonly Payroll[] = [];
  employees: readonly Employee[] = [];
  editCache: { [key: string]: { edit: boolean; data: Payroll } } = {};
  employeeName(id: string): string {
    return this.employees.find(emp => emp.employeeID === id)!.fullname;
  }

  //Methods
  async handleLoadData() {
    this.loading = true;
    await this.useService.getData("Payrolls/").subscribe({
      next: (result: readonly Payroll[]) => {
        setTimeout(() => {
          this.payrolls = result;
          this.loading = false;
          this.updateEditCache();
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false; 
        console.log(error);
      }
    });
    await this.useService.getData("Employees/").subscribe({
      next: (result) => {
        setTimeout(() => {
          this.employees = result;
          this.loading = false;
          this.updateEditCache();
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false; 
        console.log(error);
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
    await this.useService.deleteData(`Payrolls/${id}`)
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
    await this.useService.putData(`Payrolls/${this.editCache[id].data.payRollID}`, this.editCache[id].data)
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
    XLSX.writeFile(wb, 'Bảng lương.xlsx');
  }

  ngOnInit(): void {
    this.handleLoadData();
  }
}
