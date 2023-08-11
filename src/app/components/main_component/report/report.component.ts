import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReportColumnList } from 'src/app/models/listOfColumn';
import { Employee, Report, Schedule } from 'src/app/models/dto';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from 'xlsx'
import { UseServiceService } from 'src/app/services/useService/use-service.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  //Constructor
  constructor(
              private nzMessageService: NzMessageService,
              private useService: UseServiceService) {
    
  }

  //Decalre Variable
  loading = false;
  width = window.innerWidth;
  listOfColumn = ReportColumnList;
  reports: readonly Report[] = [];
  schedules: readonly Schedule[] = [];
  employees: readonly Employee[] = [];
  date: Date = new Date();

  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }
  getEmployeeName(id: string): string | undefined {
    let fullname = this.employees.find(emp => emp.employeeID === id) != null ? this.employees.find(emp => emp.employeeID === id)?.fullname : "";
    return fullname;
  }

  async handleLoadData(month: number)
  {
    this.loading = true;
    await this.useService.getData(`Reports?month=${month}`).subscribe((reports) => {
        setTimeout(() => {
          this.reports = reports;
          this.loading = false;
        }, 600);
    });
    await this.useService.getData("Employees/").subscribe((employees) => {
        setTimeout(() => {
          this.employees = employees;
        }, 600);
    });
    await this.useService.getData("Schedules/").subscribe((schedules) => {
      setTimeout(() => {
        this.schedules = schedules;
      }, 600);
  });
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

  totalWorkHours(id: string): { total: number, violation: number }
  {
    let sum = 0, count = 0;
    this.schedules.filter(x => x.employeeID === id && x.isSubmit).map(value => {
      sum += value.totalWorkHours;
      value.violationID != null ? count++ : null;
    })

    return { total: sum, violation: count};
  }


  exportXLSX(): void {
    let elm = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elm);

    //Tạo work book và thêm work sheet vào
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //Lưu lại
    XLSX.writeFile(wb, 'Báo cáo.xlsx');
  }

  ngOnInit(): void {
    this.handleLoadData(new Date().getMonth() + 1);
    this.date.setMonth(new Date().getMonth());
  }
}
