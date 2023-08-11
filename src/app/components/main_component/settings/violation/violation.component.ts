import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Violation } from 'src/app/models/dto';
import { ViolationColumnList } from 'src/app/models/listOfColumn';
import { UseServiceService } from 'src/app/services/useService/use-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-violation',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.css']
})
export class ViolationComponent {
  constructor(
              private nzMessageService: NzMessageService,
              private useService: UseServiceService) { }

  //Declare variables
  loading = false;
  width = window.innerWidth;
  listOfColumn = ViolationColumnList;
  violations: readonly Violation[] = [];
  editCache: { [key: string]: { edit: boolean; data: Violation } } = {};

  //Methods
  async handleLoadData() {
    this.loading = true;
    await this.useService.getData("Violations/").subscribe({
      next: (result) => {
        setTimeout(() => {
          this.violations = result;
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
    this.violations = [];
    this.handleLoadData();
  }

  cancel(): void {
    this.nzMessageService.info('Hủy');
  }

  async confirm(violationID: number) {
    await this.useService.deleteData(`Violations/${violationID}`)
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
    const index = this.violations.findIndex(item => item.violationID === id);
    this.editCache[id] = {
      data: { ...this.violations[index] },
      edit: false
    };
  }

  async saveEdit(id: number) {
    const waiting = this.nzMessageService.loading('Chờ vài giây..', { nzDuration: 0 }).messageId;
    await this.useService.putData(`Violations/${this.editCache[id].data.violationID}`, this.editCache[id].data)
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
    this.violations.forEach(item => {
      this.editCache[item.violationID] = {
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
    XLSX.writeFile(wb, 'Lỗi.xlsx');
  }

  ngOnInit(): void {
    this.handleLoadData();
  }
}
