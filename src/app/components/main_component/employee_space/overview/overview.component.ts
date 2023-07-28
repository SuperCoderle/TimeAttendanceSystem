import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee } from 'src/app/models/dto';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ListOfColumnEmployee } from 'src/app/models/listOfColumn';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{

  constructor(private empService : EmployeeService, private router: Router, private nzMessageService:NzMessageService) {}

  //Declare variables
  loading = false;
  indeterminate = false;
  listOfColumn = ListOfColumnEmployee;
  listOfCurrentPageData: readonly Employee[] = [];
  employees: readonly Employee[] = [];
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }

  async handleLoadData()
  {
    this.loading = true;
    await this.empService.getAllEmployees().subscribe({
      next: (result) => {
        setTimeout(() => {
          this.employees = result;
          this.loading = false;
        }, 600);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 403)
        {
          this.router.navigate(["/403"]);
        }
        else
        {
          this.loading = false;
        }
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
    await this.empService.Delete(employeeID)
      .subscribe({
        next: (result) => {
          setTimeout(() => {
            this.nzMessageService.success('Xóa thành công');
          }, 600);
          this.handleLoadData();
        },
        error: (error) => {
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
