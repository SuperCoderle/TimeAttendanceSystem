import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReportColumnList } from 'src/app/models/listOfColumn';
import { Employee, Report } from 'src/app/models/dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from 'xlsx'
import { CheckStatusCode } from 'src/app/status/status';
import { UseServiceService } from 'src/app/services/useService/use-service.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  //Constructor
  constructor(private router: Router,
              private nzMessageService: NzMessageService,
              private useService: UseServiceService) {
    
  }

  //Decalre Variable
  checkStatusCode: CheckStatusCode = new CheckStatusCode(this.router);
  loading = false;
  indeterminate = false;
  listOfColumn = ReportColumnList;
  listOfCurrentPageData: readonly Report[] = [];
  reports: readonly Report[] = [];
  employees: readonly Employee[] = [];
  date: Date = new Date();
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }
  getEmployeeName(id: string): string {
    let fullname = this.employees.find(emp => emp.employeeID === id)!.fullname;
    return fullname;
  }

  async handleLoadData(month: number)
  {
    this.loading = true;
    await this.useService.getData(`Reports?month=${month}`).subscribe({
      next: (result) => {
        setTimeout(() => {
          this.reports = result;
          this.loading = false;
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        this.checkStatusCode.ErrorResponse(error.status) ? "" : this.loading = false; console.log(error);
      }
    });
    await this.useService.getData("Employees/").subscribe({
      next: (result) => {
        setTimeout(() => {
          this.employees = result;
        }, 600);
      },
      error: (error:HttpErrorResponse) => {
        this.checkStatusCode.ErrorResponse(error.status) ? "" : console.log(error);
      }
    })
  }

  handleReload()
  {
    this.reports = [];
    this.handleLoadData(this.date.getMonth() + 1);
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
  }

  async confirm(reportID: number) {
    await this.useService.deleteData(`Reports/${reportID}`)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.success('Xóa thành công');
          }, 600);
          this.handleLoadData(this.date.getMonth() + 1);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.nzMessageService.error('Xóa thất bại');
        }
      })
  }

  onChange(result: Date): void {
    this.date = result;
    this.handleLoadData(this.date.getMonth() + 1);
  }

  exportXLSX(): void {
    let elm = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elm);

    //Tạo work book và thêm work sheet vào
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Nhân viên.xlsx');
  }

  ngOnInit(): void {
    this.handleLoadData(1);
    this.date.setMonth(0);
  }
}