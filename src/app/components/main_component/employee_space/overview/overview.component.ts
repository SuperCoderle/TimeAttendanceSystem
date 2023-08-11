import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee, Payroll, Schedule, User } from 'src/app/models/dto';
import { EmployeeColumnList } from 'src/app/models/listOfColumn';
import * as XLSX from 'xlsx';
import { UseServiceService } from 'src/app/services/useService/use-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit{

  constructor(private useService : UseServiceService, 
              private nzMessageService:NzMessageService,
              ) {}

  //Declare variables
  loading = false;
  visible = false;
  searchValue = '';
  width = window.innerWidth;
  listOfColumn = EmployeeColumnList;
  employees: readonly Employee[] = [];
  dateFormat(date: Date): string {
    return moment(date).format("DD-MM-YYYY");
  }
  dateTimeFormat(date: Date): string {
    return moment(date).format("MMM, DD YYYY  LT");
  }

  currentFile: any;

  async handleLoadData()
  {
    this.loading = true;
    await this.useService.getData("Employees/").subscribe((employees) => {
      setTimeout(() => {
        this.loading = false;
        this.employees = employees;;
      })

    });
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

  async onFileSelected(event: Event) {
    const id = this.nzMessageService.loading("Đợi trong vài giây...", { nzDuration: 0 }).messageId;
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        let file = target.files[0];
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        console.log(typeof(formData));
        await this.useService.postData("Files/Employee", formData)
          .subscribe({
            next: (result) => {
              setTimeout(() => {
                this.nzMessageService.remove(id);
                this.nzMessageService.success("Tải lên thành công.");
                this.handleLoadData();
              }, 600);
            },
            error: (error: HttpErrorResponse) => {
              this.nzMessageService.remove(id);
              console.log(error);
            }
          })
    }
  }

  reset(): void {
    this.searchValue = '';
    this.handleLoadData();
  }

  search(): void {
    this.visible = false;
    this.employees = this.employees.filter((item: Employee) => item.fullname.indexOf(this.searchValue) !== -1);
  }

  handleReload()
  {
    this.employees = [];
    this.handleLoadData();
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
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
