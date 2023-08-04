import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee } from 'src/app/models/dto';
import { EmployeeColumnList } from 'src/app/models/listOfColumn';
import * as XLSX from 'xlsx';
import { CheckStatusCode } from 'src/app/status/status';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit{

  constructor(private useService : UseServiceService, 
              private router: Router, 
              private nzMessageService:NzMessageService,
              ) {}

  //Declare variables
  loading = false;
  indeterminate = false;
  listOfColumn = EmployeeColumnList;
  listOfCurrentPageData: readonly Employee[] = [];
  employees: readonly Employee[] = [];
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }
  checkStatusCode: CheckStatusCode = new CheckStatusCode(this.router);

  async handleLoadData()
  {
    this.loading = true;
    await this.useService.getData("Employees/").subscribe({
      next: (result) => {
        setTimeout(() => {
          this.employees = result;
          this.loading = false;
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        this.checkStatusCode.ErrorResponse(error.status) ? "" : this.loading = false; console.log(error);
      }
    });
  }

  handleReload()
  {
    this.employees = [];
    this.handleLoadData();
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
  }

  async confirm(employeeID: string) {
    await this.useService.deleteData(`Employees/${employeeID}`)
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
    this.handleLoadData();
  }
}
